import accounting from 'accounting';

/**
 * Capitalizes the first letter of a string.
 * @param str The input string to be capitalized.
 * @returns The capitalized string.
 */
export const capitalize = (str?: string, emptyDefault?: string) => {
  return str
    ? str.charAt(0)?.toUpperCase() + str.slice(1)?.toLowerCase()
    : emptyDefault;
};

/**
 * Pads a number with leading characters until it reaches the specified length.
 * @param num - The number to pad.
 * @param maxwidth - The maximum length of the resulting string.
 * @param char - The character to use for padding. Default is '0'.
 * @returns The padded number as a string.
 */
export const padNumber = (
  num: number | string,
  maxwidth = 4,
  char = '0',
): string => {
  const s = num.toString();
  return s.padStart(maxwidth, char);
};

/**
 * Formats a number using accounting.js library
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
  return accounting.formatNumber(number, precision);
};

export const formatMoney = (amount: number | string) => {
  return accounting.formatMoney(Number(amount));
};

/**
 * Formats the given size in bytes into a human-readable string.
 * @param size The size in bytes to format.
 * @returns A human-readable string representing the size.
 */
export const formatFileSize = (size: number): string => {
  const kb = size / 1024;
  return kb >= 1024
    ? `${formatNumber(kb / 1024, 1)} MB`
    : `${Math.floor(kb)} KB`;
};

/**
 * Format a phone number to the format "(XXX) XXX-XXXX".
 * @param rawPhoneNumber - The raw phone number to format.
 * @returns The formatted phone number.
 */
export const formatPhone = (rawPhoneNumber: string | number) => {
  const phoneNumber = `${rawPhoneNumber}`.replace(/\D/g, '');
  const length = phoneNumber.length;

  if (length < 7) {
    return phoneNumber;
  }

  if (length < 10) {
    const pre = phoneNumber.substring(0, 3);
    const post = phoneNumber.substring(3, 7);
    return `${pre}-${post}`;
  }

  const partA = phoneNumber.substring(0, 3);
  const partB = phoneNumber.substring(3, 6);
  const partC = phoneNumber.substring(6, 10);
  return `(${partA}) ${partB}-${partC}`;
};
