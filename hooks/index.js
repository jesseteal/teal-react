import * as windowSize from './windowSize';
import * as dirty from './dirty';
import * as mounting from './onMount';
import * as position from './position';
import * as context from './context';
import * as debounce from './useDebounce';

const Hooks = {
  ...mounting,
  ...dirty,
  ...windowSize,
  ...position,
  ...context,
  ...debounce
}

export default Hooks;
