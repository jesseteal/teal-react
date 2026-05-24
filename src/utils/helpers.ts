/**
 * Filters an array of objects by searching for a term within specified paths.
 *
 * @param objects - The array of objects to filter.
 * @param term - The search term.
 * @param paths - The paths within each object to search for the term.
 * @returns An array of objects that contain the search term.
 */
export function filterObjectArray<T extends Record<string, any>>(
  objects: T[],
  term: string,
  paths: string[],
): T[] {
  return objects.filter((obj) => searchObject(obj, term, paths));
}

/**
 * Checks whether two objects are different by comparing their JSON representations.
 *
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns Whether the objects are different or not.
 */
export function hasDiff(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

/**
 * Checks if a given value is a finite numeric value.
 *
 * @param n - The value to check.
 * @returns Whether or not the value is a finite numeric value.
 */
export function isNumeric(n: any): boolean {
  let num = typeof n === 'string' && n ? Number(n) : n;
  return !isNaN(num) && Number.isFinite(num);
}

/**
  Searches for given search terms in the specified object's paths.
  @param obj - The object to search within.
  @param terms - The search terms to look for.
  @param paths - An array of property paths in the object to search within.
  @returns Whether the object contains all search terms within the specified paths.
  */
export function searchObject(
  obj: any,
  terms: string,
  paths: string[],
): boolean {
  if (!terms) {
    return true;
  }
  const termsList = terms.toLowerCase().split(' ');
  return paths.some((path) => {
    const value = get(obj, path, '').toString().toLowerCase();
    return termsList.every((term) => value.includes(term));
  });
}

/**
 * Returns the value passed in, unless it's null or undefined,
 * in which case it returns the value passed in as defaultTo.
 * If val is 0 or an empty string, it returns 0 or an empty string respectively.
 * @param val The value to check for null, undefined, or empty string
 * @param defaultTo The default value to return if val is null or undefined
 * @returns val if it's not null or undefined, otherwise defaultTo
 */
export function zeroIsOk(val: any, defaultTo: any = ''): any {
  if (val === null || val === undefined) {
    return defaultTo;
  }
  if (val === 0 || val === '') {
    return val;
  }
  return val;
}

/**
 * Returns true if the given value is not undefined or null, false otherwise
 * @param val The value to check
 * @returns True if the value is defined and not null, false otherwise
 */
export function isSet(val: any): boolean {
  if (val === undefined || val === null) {
    return false;
  }
  return true;
}

/**
 * Checks if a value is null, undefined, empty, or an empty object or array
 * @param val - The value to check
 * @returns True if the value is null, undefined, empty, or an empty object or array; false otherwise
 */
export function isNullOrEmpty(val: any): boolean {
  if (!val && val !== 0 && val !== false) {
    return true;
  }
  if (Array.isArray(val) || typeof val === 'string') {
    return val.length === 0;
  }
  if (typeof val === 'object') {
    return Object.keys(val).length === 0;
  }
  return false;
}

export function get<TDefault = any>(
  obj: any,
  path: string | Array<string | number>,
  defaultValue?: TDefault,
): any | TDefault {
  const parts = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '')
        .split('.');

  const value = parts.reduce((result, key) => {
    if (result === null || result === undefined || key === '') {
      return undefined;
    }
    return result[key];
  }, obj);

  return value === undefined ? defaultValue : value;
}

export function find<T>(
  array: T[],
  predicate: Partial<T> | ((item: T) => boolean),
): T | undefined {
  if (typeof predicate === 'function') {
    return array.find(predicate);
  }

  return array.find((item) =>
    Object.entries(predicate).every(([key, value]) => get(item, key) === value),
  );
}

export function omitBy<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: string) => boolean,
): Partial<T> {
  return Object.entries(obj || {}).reduce<Partial<T>>((result, [key, value]) => {
    if (!predicate(value, key)) {
      result[key as keyof T] = value;
    }
    return result;
  }, {});
}
