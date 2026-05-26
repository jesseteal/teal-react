import Utils, * as utils from '../index.js';

describe('utils index', () => {
  it('exports utility modules and default Utils collection', () => {
    expect(utils.APIClient).toEqual(expect.any(Function));
    expect(utils.formatMoney(12)).toBe('$12.00');
    expect(utils.Obfuscate.show(utils.Obfuscate.hide(7))).toBe(7);
    expect(Utils.formatMoney(12)).toBe('$12.00');
    expect(Utils.date.secondsToTime(60)).toBe('1 min');
  });
});
