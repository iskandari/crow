import helpers from '@/helpers';

const header = 'datetime,height,dd,ff,dens,sd_vvp,eta';
const first = '2024-08-01T13:05:00Z,100,180,5,2,3,22';

test('CSV keeps the first duplicate and preserves profile order and UTC timestamps', () => {
  const rows = helpers.parseVpts([header, first,
    '2024-08-01T13:05:00Z,200,90,6,4,2,44',
    '2024-08-01T13:05:00Z,100,0,0,99,3,99',
    '2024-08-01T13:10:00Z,100,90,6,4,2,44', ''].join('\n'), 'CSV');
  expect(rows).toHaveLength(3);
  expect(rows[0]).toEqual({datetime: Date.UTC(2024, 7, 1, 13, 5), height: 100, dd: 180, ff: 5, dens: 2, sd_vvp: 3, eta: 22});
  expect(rows.map(row => row.height)).toEqual([100, 200, 100]);
});

test.each(['', '\n', '\r\n', '\n\n'])('CSV retains its final record with ending %j', ending => {
  expect(helpers.parseVpts(header + '\n' + first + ending, 'CSV')).toHaveLength(1);
});

test('CSV handles quoted headers, missing values, and empty input', () => {
  const rows = helpers.parseVpts('"datetime","height","dd","ff","dens","sd_vvp","eta"\r\n2024-08-01 23:00:00,0,NaN,NaN,NaN,NaN,NaN\r\n', 'CSV');
  expect(rows[0].datetime).toBe(Date.UTC(2024, 7, 1, 23));
  expect(rows[0].dens).toBe(0);
  expect(rows[0].eta).toBe(0);
  expect(rows[0].sd_vvp).toBeNaN();
  expect(helpers.parseVpts('', 'CSV')).toEqual([]);
});
