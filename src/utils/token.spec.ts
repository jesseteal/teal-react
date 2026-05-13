import { saveToken, onTokenChange } from './token';

const localStorageMock = { setItem: jest.fn(), removeItem: jest.fn() };

describe('saveToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('saves token to localStorage and calls callbacks when token is provided', () => {
    const token = 'abc';
    // const localStorageMock = { setItem: jest.fn() };
    // Object.defineProperty(window, 'localStorage', {
    //   value: localStorageMock,
    // });

    const callback1 = jest.fn();
    const callback2 = jest.fn();

    saveToken(token);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'teal-react-token',
      token,
    );
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    saveToken(undefined);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      'teal-react-token',
    );
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    saveToken(null);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      'teal-react-token',
    );
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    saveToken('def');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'teal-react-token',
      'def',
    );
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);

    saveToken('');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'teal-react-token',
      '',
    );
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);

    saveToken();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      'teal-react-token',
    );
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);

    onTokenChange(callback1);
    onTokenChange(callback2);
    saveToken(token);
    saveToken(token);

    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback1).toHaveBeenCalledWith(token);

    expect(callback2).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledWith(token);
  });
});
