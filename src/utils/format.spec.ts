import {
  capitalize,
  padNumber,
  formatNumber,
  formatMoney,
  formatPhone,
  formatFileSize,
} from './format';

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('returns undefined if input is empty', () => {
    expect(capitalize('')).toBeUndefined();
  });

  it('returns undefined if input is null', () => {
    expect(capitalize(undefined, '')).toBe('');
  });

  it('returns undefined if input is undefined', () => {
    expect(capitalize(undefined)).toBeUndefined();
  });
});

describe('formatting', () => {
  it('should pad numbers', () => {
    expect(padNumber(12)).toEqual('0012');
    expect(padNumber(1234)).toEqual('1234');
    expect(padNumber('1234')).toEqual('1234');
    expect(padNumber(1234, 8)).toEqual('00001234');
  });

  it('should format money', () => {
    expect(formatMoney(1.23)).toEqual('$1.23');
    expect(formatMoney(1000.23)).toEqual('$1,000.23');
    expect(formatMoney(1000000.23)).toEqual('$1,000,000.23');
  });
});

describe('formatNumber', () => {
  it('should format a number with default options', () => {
    expect(formatNumber(1234.56789)).toBe('1,235');
  });

  it('should format a number with custom precision', () => {
    expect(formatNumber(1234.56789, 2)).toBe('1,234.57');
  });

  it('should return null if number is 0 and showZero is false', () => {
    expect(formatNumber(0, 2, false)).toBe(null);
  });

  it('should handle string input', () => {
    expect(formatNumber('1234.56789', 2)).toBe('1,234.57');
  });

  it('should handle null input', () => {
    expect(formatNumber(null)).toBe('0');
  });
});

describe('formatFileSize', () => {
  it('should return the file size in KB if it is less than 1MB', () => {
    expect(formatFileSize(1023)).toEqual('0 KB');
    expect(formatFileSize(1024)).toEqual('1 KB');
    expect(formatFileSize(2048)).toEqual('2 KB');
    expect(formatFileSize(512000)).toEqual('500 KB');
    expect(formatFileSize(999999)).toEqual('976 KB');
  });

  it('should return the file size in MB if it is greater than or equal to 1MB', () => {
    expect(formatFileSize(1048576)).toEqual('1.0 MB');
    expect(formatFileSize(1572864)).toEqual('1.5 MB');
    expect(formatFileSize(3145728)).toEqual('3.0 MB');
    expect(formatFileSize(10485760)).toEqual('10.0 MB');
  });
});

describe('formatPhone', () => {
  it('should format a 7-digit phone number with dashes', () => {
    expect(formatPhone('5551234')).toBe('555-1234');
  });

  it('should format a 10-digit phone number with parentheses and dashes', () => {
    expect(formatPhone('5555551234')).toBe('(555) 555-1234');
  });

  it('should format a phone number with extra characters', () => {
    expect(formatPhone('555-555-1234 x123')).toBe('(555) 555-1234');
  });
});
