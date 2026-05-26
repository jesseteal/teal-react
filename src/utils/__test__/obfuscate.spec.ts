import { Obfuscate } from '../obfuscate.js';

describe('Obfuscate', () => {
  it('round trips numeric ids through the public helpers', () => {
    const hidden = Obfuscate.hide(42);

    expect(hidden).toEqual(expect.any(String));
    expect(Obfuscate.show(hidden)).toBe(42);
  });
});
