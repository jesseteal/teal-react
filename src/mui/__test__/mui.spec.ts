import { Button, Grid, MuiIcons, ThemeProvider } from '../index';

describe('mui entrypoint', () => {
  it('re-exports MUI Material components and icons', () => {
    expect(Button).toEqual(expect.any(Object));
    expect(Grid).toEqual(expect.any(Object));
    expect(ThemeProvider).toEqual(expect.any(Function));
    expect(MuiIcons.Add).toEqual(expect.any(Object));
  });
});
