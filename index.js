import * as useArray from './hooks/useArray';
import * as useWindowSize from './hooks/useWindowSize';
import * as useTrackObject from './hooks/useTrackObject';
// import * as xxx from './hooks/xxx';
import * as useWindowScroll from './hooks/useWindowScroll';
import * as useUpdate from './hooks/useUpdate';
import * as useStateWithCallback from './hooks/useStateWithCallback';
import * as usePromise from './hooks/usePromise';
// import * as useFetch from './hooks/useFetch';
import * as useOnScreen from './hooks/useOnScreen';
import * as useMap from './hooks/useMap';
import * as useLocalStorage from './hooks/useLocalStorage';
import * as useInputValue from './hooks/useInputValue';
import * as useEventListener from './hooks/useEventListener';
import * as useOnMount from './hooks/useOnMount';
import * as usePosition from './hooks/usePosition';
import * as usePrevious from './hooks/usePrevious';
import * as useContextState from './hooks/useContextState';
import * as useDebounce from './hooks/useDebounce';

import _utils from './utils';
import _api from './utils/api';
export const Utils = _utils;
export const Api = _api;
export const Hooks = {
  ...useArray,
  ...useOnMount,
  ...useTrackObject,
  ...useWindowSize,
  ...usePosition,
  ...useContextState,
  ...useDebounce,
  ...useEventListener,
  ...useInputValue,
  ...useLocalStorage,
  ...useMap,
  ...useOnScreen,
  // ...useFetch,
  ...usePromise,
  ...usePrevious,
  ...useStateWithCallback,
  ...useUpdate,
  ...useWindowScroll
}
// const TealReact = {
//   // tbd
// };
// export const Hooks = _Hooks;
export default {
  Hooks
};
