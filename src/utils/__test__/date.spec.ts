import { before, secondsToTime, toDate } from '../date';

describe('date utils', () => {
  it('should convert string to date', () => {
    expect(typeof toDate('2000-12-12')).toEqual('object');
  });

  it('should convert seconds', () => {
    expect(secondsToTime(59)).toEqual('59 secs');
    expect(secondsToTime(60)).toEqual('1 min');
    expect(secondsToTime(61)).toEqual('1 min');
    expect(secondsToTime(125)).toEqual('2 mins');
    expect(secondsToTime(3600)).toEqual('1 hr');
    expect(secondsToTime(3600 * 2)).toEqual('2 hrs');
    expect(secondsToTime(86400)).toEqual('1 day');
    expect(secondsToTime(86400 * 2)).toEqual('2 days');
  });

  it('should compare dates', () => {
    expect(before('2001-01-01', '2001-01-02')).toBeTruthy();
    expect(before('2001-01-02', '2001-01-02')).toBeFalsy();
    expect(before('2001-01-02', '2001-01-01')).toBeFalsy();
  });
});
