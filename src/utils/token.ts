import jwtDecode from 'jwt-decode';
import { useCallback, useMemo } from 'react';
import { useAppState } from '../hooks/useAppState';
import { isNullOrEmpty } from './helpers';

const token_key = (process.env && process.env.TOKEN_NAME) || 'teal-react-token';

let encodedToken: string | null;
const _onTokenChange: Array<(token: string | null) => void> = [];

/**
 * Saves the authentication token to local storage and triggers any registered callback functions.
 * @param token - The authentication token to be saved. If null or undefined, the token will be removed.
 */
export function saveToken(token?: string | null): void {
  encodedToken = token ?? null;

  if (encodedToken !== null) {
    window.localStorage?.setItem(token_key, encodedToken);
  } else {
    window.localStorage?.removeItem(token_key);
  }

  for (const callback of _onTokenChange) {
    callback(encodedToken);
  }
}

export function onTokenChange(callback: any): void {
  _onTokenChange.push(callback);
}

export const isAuthenticated = () => {
  if (!encodedToken) {
    // try local storage
    encodedToken =
      window.localStorage && window.localStorage.getItem(token_key);
  }
  return !!encodedToken;
};

export const getTokenData = (): any => {
  if (isAuthenticated()) {
    return jwtDecode(encodedToken || '');
  }
  return {};
};

export const getToken = () => (isAuthenticated() ? encodedToken : null);

export const hasRole = (role: string[] | string, field: string = 'roles') => {
  const token = getTokenData();
  const roles: string[] = typeof role === 'string' ? role.split(',') : role;
  if (!isNullOrEmpty(token) && token[field]) {
    for (var r of roles) {
      if (token[field].indexOf(r) > -1) {
        return true;
      }
    }
  }
  return false;
};

export const useAuth = () => {
  const [token, setGlobalToken] = useAppState('token', getToken());
  const setToken = useCallback((token?: string | null) => {
    saveToken(token);
    setGlobalToken(token);
    // eslint-disable-next-line
  }, []);
  const user = useMemo(() => {
    if (!isAuthenticated()) {
      return undefined;
    }
    const t = getTokenData();
    return {
      id: t.sub,
      role: t.r,
      firstname: t.f,
      lastname: t.l,
      email: t.e,
      hasRole: (role?: string) => !role || t.r === role || role === 'any',
      isDev: t.e === 'jesseteal@gmail.com',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return { user, setToken, token };
};
