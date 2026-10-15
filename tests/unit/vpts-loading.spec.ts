import Vue from 'vue';
import Home from '@/components/Home.vue';
import moment from 'moment-timezone';
import axios from 'axios';
import config from '@/config';

const methods = (Home as any).options.methods;
const start = Date.UTC(2024, 7, 1);
const row = (datetime = start, height = 0, dens = 2) => ({datetime, height, dens, dd: 180, ff: 5, sd_vvp: 3, eta: 22});

test('publishes one nonreactive snapshot per day, preserves older snapshots and other days', () => {
  const initial = Object.freeze({
    [start]: {sunAltitude: 10, heightData: {0: {noData: true}, 100: {noData: true}}},
    [start + 86400000]: {sunAltitude: 20, heightData: {0: {noData: true}}}
  });
  const vm = new Vue({data: {radarVpts: initial, appTemporalResolution: 900}}) as any;
  const published = jest.fn();
  vm.$watch('radarVpts', published, {sync: true});
  methods.storeDataRows.call(vm, [row(), row(start + 60000, 100), row(start + 120000, 0, 5), row(start - 1)]);
  expect(published).toHaveBeenCalledTimes(1);
  expect(initial[start].heightData[0]).toEqual({noData: true});
  expect(vm.radarVpts[start].heightData[0]).toMatchObject({datetime: start, dens: 5, noData: false});
  expect(vm.radarVpts[start].heightData[100].datetime).toBe(start);
  expect(vm.radarVpts[start + 86400000]).toBe(initial[start + 86400000]);
  expect(Object.isFrozen(vm.radarVpts)).toBe(true);
  expect(vm.radarVpts[start].heightData.__ob__).toBeUndefined();
  const firstDay = vm.radarVpts[start];
  methods.storeDataRows.call(vm, [row(start + 86400000)]);
  expect(published).toHaveBeenCalledTimes(2);
  expect(vm.radarVpts[start]).toBe(firstDay);
  vm.$destroy();
});

test('date selection does not mutate the displayed time range', () => {
  const from = moment.utc('2024-08-01');
  const to = moment.utc('2024-08-04');
  expect(methods.getDatesForData.call({appTemporalResolution: 900}, from, to)).toEqual(['2024-08-01', '2024-08-02', '2024-08-03']);
  expect(from.valueOf()).toBe(start);
  expect(to.valueOf()).toBe(start + 3 * 86400000);
});

test('ignores late responses from an earlier selection', async () => {
  let finish: (response: any) => void = () => undefined;
  const get = jest.spyOn(axios, 'get').mockImplementation(() => new Promise(resolve => {finish = resolve;}));
  const context = {
    loadGeneration: 1, filesLoadingCount: 0,
    getDatesForData: () => ['2024-08-01'],
    storeDataRows: jest.fn()
  };
  try {
    methods.populateDataFromCrowServer.call(context, config.availableRadars[0].options[0], moment.utc(start), moment.utc(start + 86400000));
    expect(context.filesLoadingCount).toBe(1);
    context.loadGeneration = 2;
    context.filesLoadingCount = 3;
    finish({data: 'stale response must not be parsed'});
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(context.storeDataRows).not.toHaveBeenCalled();
    expect(context.filesLoadingCount).toBe(3);
  } finally {
    get.mockRestore();
  }
});
