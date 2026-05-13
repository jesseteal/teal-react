import * as helpers from './helpers';
import * as date from './date';
import * as token from './token';
import * as format from './format';

export const Utils = {
  ...helpers,
  date,
  token,
  ...format,
};

export default Utils;
