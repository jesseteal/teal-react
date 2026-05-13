import React from 'react';
// import { GContext } from '../components/ContextProvider';
// SETUP:
// in index.js
// import { ContextProvider } from '@jesseteal/teal-react';
//
// <ContextProvider>
//   <App />
// </ContextProvider>
//
// USAGE:
// const [snack, setSnack] = useAppState('snack',null);
//
const GContext = React.createContext([{}, () => {}]);

export function ContextProvider({ children }: { children: any }) {
  const state = React.useState({});
  const value = React.useMemo(() => state, [state[0]]);
  return React.createElement(GContext.Provider, { value }, children);
}

export const useAppState = (contextKey: string, initialState?: any) => {
  const [contextState, setContextState] = React.useContext<any>(GContext);
  const state =
    contextState[contextKey] != null ? contextState[contextKey] : initialState;

  const setState = (nextState: any) =>
    setContextState((prevState: any) =>
      Object.assign({}, prevState, {
        [contextKey]:
          typeof nextState === 'function' ? nextState(prevState) : nextState,
      })
    );

  React.useLayoutEffect(() => {
    if (contextState[contextKey] == null && state != null) {
      setContextState((prevState: any) => {
        if (prevState[contextKey] == null) {
          return Object.assign({}, prevState, {
            [contextKey]: state,
          });
        }
        return prevState;
      });
    }
  }, [contextKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return [state, setState];
};
