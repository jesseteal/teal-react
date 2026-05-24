const DEFAULT_THOUSANDS_SEPARATOR = ',';
const DEFAULT_DECIMAL_SEPARATOR = '.';
const DEFAULT_CURRENCY_SYMBOL = '$';

const normalizePrecision = (precision: number, fallback = 0): number => {
  const normalized = Math.round(Math.abs(precision));
  return Number.isNaN(normalized) ? fallback : normalized;
};

const roundToFixed = (value: number, precision: number): string => {
  const decimalPlaces = normalizePrecision(precision);
  const power = 10 ** decimalPlaces;

  return (Math.round(value * power) / power).toFixed(decimalPlaces);
};

/**
 * Formats a number with comma-separated thousands.
 * @param num - The number to format
 * @param precision - The number of decimal places to include
 * @param showZero - Whether to show zero values
 * @returns The formatted number as a string, or null if num is 0 and showZero is false
 */
export const formatNumber = (
  num: number | string | null | undefined,
  precision = 0,
  showZero = true,
): string | null => {
  const number = Number(num ?? 0);
  if (number === 0 && !showZero) {
    return null;
  }

  const decimalPlaces = normalizePrecision(precision);
  const negative = number < 0 ? '-' : '';
  const fixed = roundToFixed(Math.abs(number || 0), decimalPlaces);
  const [base, decimal] = fixed.split('.');
  const mod = base.length > 3 ? base.length % 3 : 0;
  const leading = mod
    ? `${base.slice(0, mod)}${DEFAULT_THOUSANDS_SEPARATOR}`
    : '';
  const grouped = base
    .slice(mod)
    .replace(/(\d{3})(?=\d)/g, `$1${DEFAULT_THOUSANDS_SEPARATOR}`);

  return `${negative}${leading}${grouped}${
    decimalPlaces ? `${DEFAULT_DECIMAL_SEPARATOR}${decimal}` : ''
  }`;
};

export const formatMoney = (amount: number | string): string => {
  const formattedAmount = formatNumber(Number(amount), 2);
  return `${DEFAULT_CURRENCY_SYMBOL}${formattedAmount}`;
};
