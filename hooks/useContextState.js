import React from 'react';

// SETUP:
// in index.js
// import { Provider } from 'teal-react/hooks/context';
//
// <Provider>
//   <App />
// </Provider>
//
// USAGE:
// pub/sub
// const [snack, setSnack] = Hooks.useContextState('snack',null);
// or just pub
// const setGlobalSnack = Hooks.useSetContextState('snack');
//
const Context = React.createContext([{}, () => {}]);

export const Provider = ({ children }) => {
  const state = React.useState({});
  const value = React.useMemo(() => state, [state[0]]);// eslint-disable-line react-hooks/exhaustive-deps
  return React.createElement(Context.Provider, { value, children })
  // return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextState = (contextKey, initialState =  null) => {
  const [contextState, setContextState] = React.useContext(Context);

  const state = contextState[contextKey] != null
    ? contextState[contextKey]
    : initialState;

  const setState = nextState =>
    setContextState(prevState => Object.assign({}, prevState, {
      [contextKey]: typeof nextState === "function"
        ? nextState(prevState)
        : nextState
    }));

  React.useLayoutEffect(() => {
    if (contextState[contextKey] == null && state != null) {
      setContextState(prevState => {
        if (prevState[contextKey] == null) {
          return Object.assign({}, prevState, {
            [contextKey]: state
          });
        }
        return prevState;
      });
    }
  }, [contextKey]);// eslint-disable-line react-hooks/exhaustive-deps

  return [state, setState];
}

export const useSetContextState = (contextKey, initialState = null) => {
  const [val, setVal] = useContextState(contextKey, initialState);// eslint-disable-line no-unused-vars
  return setVal;
}
