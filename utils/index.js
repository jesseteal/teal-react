import * as deepEquals from './deepEquals';
import * as helpers from './helpers';
import * as date_helpers from './date_helpers';
import * as token_helpers from './token_helpers';
import * as array_helpers from './array_helpers';
import * as format from './format';
import api from './api';

export const Api = {...api};
const Util = {
  ...deepEquals,
  ...helpers,
  date: date_helpers,
  token: token_helpers,
  array: array_helpers,
  ...format
}

export default Util;
