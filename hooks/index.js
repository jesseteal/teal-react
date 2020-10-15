import * as useArray from './useArray';
import * as useWindowSize from './useWindowSize';
import * as useTrackObject from './useTrackObject';
import * as useWindowScroll from './useWindowScroll';
import * as useUpdate from './useUpdate';
import * as useStateWithCallback from './useStateWithCallback';
import * as usePromise from './usePromise';
// import * as useFetch from './useFetch';
import * as useOnScreen from './useOnScreen';
import * as useMap from './useMap';
import * as useLocalStorage from './useLocalStorage';
import * as useInputValue from './useInputValue';
import * as useEventListener from './useEventListener';
import * as useOnMount from './useOnMount';
import * as usePosition from './usePosition';
import * as usePrevious from './usePrevious';
import * as useContextState from './useContextState';
import * as useDebounce from './useDebounce';

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
export default Hooks;
