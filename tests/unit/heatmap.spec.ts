import { createLocalVue, mount } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import 'jest-canvas-mock';
import VPChart from '@/components/VPChart.vue';
import config from '@/config';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
const timestamp = Date.UTC(2024, 7, 1);
const rows = Array.from({length: 288 * 49}, (_, i) => ({
  timestamp: timestamp + Math.floor(i / 49) * 15 * 60 * 1000,
  height: i % 49 * 100,
  dens: i % 100,
  noData: i % 7 === 0
}));
const props = {
  vptsData: rows,
  styleConfig: {...config.VPChartStyle},
  scheme: 'viridis',
  showTimeAs: 'UTC'
};

test('three-day heatmap draws every cell on one high-DPI canvas and repaints on data and palette changes', async () => {
  const originalRatio = window.devicePixelRatio;
  Object.defineProperty(window, 'devicePixelRatio', {value: 2, configurable: true});
  const wrapper = mount(VPChart, {localVue, stubs: ['b-popover'], propsData: props});
  try {
    const canvas = wrapper.find('canvas.vp-heatmap').element as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    const chart = wrapper.vm as any;
    expect(wrapper.findAll('rect[id^="rect-"]').length).toBe(0);
    expect(canvas.width).toBe(chart.innerWidth * 2);
    expect(canvas.height).toBe(chart.innerHeight * 2);
    expect(context.scale).toHaveBeenLastCalledWith(2, 2);
    expect(context.fillRect).toHaveBeenCalledTimes(rows.length);
    const first = chart.vptsDataPrepared[0];
    expect(context.fillRect).toHaveBeenNthCalledWith(1, first.x, first.y, chart.rectWidth, chart.rectHeight);
    expect(first.fill).toBe(config.VPChartStyle.noDataColor);
    await wrapper.setData({selectedColorSchemeIdentifier: 'birdtam'});
    expect(context.fillRect).toHaveBeenCalledTimes(rows.length * 2);
    await wrapper.setProps({vptsData: rows.map(row => ({...row, dens: 0, noData: false}))});
    expect(context.fillRect).toHaveBeenCalledTimes(rows.length * 3);
    expect(chart.vptsDataPrepared.every((cell: any) => cell.fill === '#ffffff')).toBe(true);
  } finally {
    wrapper.destroy();
    Object.defineProperty(window, 'devicePixelRatio', {value: originalRatio, configurable: true});
  }
});

test('canvas geometry and colors match the SVG tooltip mode', () => {
  const sample = rows.slice(0, 98);
  const canvasWrapper = mount(VPChart, {localVue, stubs: ['b-popover'], propsData: {...props, vptsData: sample}});
  const svgWrapper = mount(VPChart, {localVue, stubs: ['b-popover'], propsData: {...props, vptsData: sample, styleConfig: {...props.styleConfig, showTooltip: true}}});
  try {
    const cells = (canvasWrapper.vm as any).vptsDataPrepared;
    const rects = svgWrapper.findAll('rect[id^="rect-"]');
    expect(svgWrapper.find('canvas.vp-heatmap').exists()).toBe(false);
    expect(rects.length).toBe(sample.length);
    cells.forEach((cell: any, i: number) => {
      expect(rects.at(i).attributes('fill')).toBe(cell.fill);
      expect(+rects.at(i).attributes('x')).toBe(cell.x);
      expect(+rects.at(i).attributes('y')).toBe(cell.y);
    });
  } finally {
    canvasWrapper.destroy();
    svgWrapper.destroy();
  }
});
