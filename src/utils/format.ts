import { formatNumber } from './numbers.js';

export { formatMoney, formatNumber } from './numbers.js';

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
