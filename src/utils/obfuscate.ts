/**
 * simple obfuscator to prevent query string manipulation
 */
export const Obfuscate = {
  hide: (id: number | string): string => {
    return (Number(id) * 1234 + 54321).toString(36);
  },
  show: (id: string): number => {
    return (parseInt(id, 36) - 54321) / 1234;
  },
};
