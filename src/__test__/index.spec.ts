import * as entry from '../index';

describe('package entrypoint', () => {
  it('re-exports components, hooks, and utilities', () => {
    expect(entry.SimpleCard).toEqual(expect.any(Function));
    expect(entry.useWindowSize).toEqual(expect.any(Function));
    expect(entry.APIClient).toEqual(expect.any(Function));
  });
});
