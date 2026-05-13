import {
  filterObjectArray,
  hasDiff,
  isNullOrEmpty,
  isNumeric,
  isSet,
  zeroIsOk,
  searchObject,
} from './helpers';

describe('helpers', () => {
  it('isNumeric', () => {
    expect(isNumeric(1)).toBeTruthy();
    expect(isNumeric('1')).toBeTruthy();
    expect(isNumeric(1.1)).toBeTruthy();
    expect(isNumeric('1.1')).toBeTruthy();
    expect(isNumeric(12345)).toBeTruthy();
    expect(isNumeric('')).toBeFalsy();
    expect(isNumeric('hello world 123')).toBeFalsy();
    expect(isNumeric({})).toBeFalsy();
    expect(isNumeric([])).toBeFalsy();
    expect(isNumeric(undefined)).toBeFalsy();
  });

  it('should hasDiff', () => {
    const a = { a: 'a' };
    const b = { a: 'a', b: 'b' };
    const c = { a: 'a' };
    expect(hasDiff(a, b)).toBeTruthy();
    expect(hasDiff(a, c)).toBeFalsy();
  });

  it('zeroIsOk', () => {
    expect(zeroIsOk(0)).toEqual(0);
    expect(zeroIsOk('string')).toEqual('string');
    expect(zeroIsOk(0)).toEqual(0);
    expect(zeroIsOk({})).toEqual({});
    expect(zeroIsOk([])).toEqual([]);

    expect(zeroIsOk(undefined)).toEqual('');
    expect(zeroIsOk(null)).toEqual('');
  });

  test('isSet', () => {
    const mockO = {};
    expect(isSet(0)).toBeTruthy();
    expect(isSet({})).toBeTruthy();
    expect(isSet([])).toBeTruthy();
    expect(isSet('')).toBeTruthy();
    expect(isSet(null)).toBeFalsy();
    expect(isSet(undefined)).toBeFalsy();
    // @ts-ignore
    expect(isSet(mockO.nothing)).toBeFalsy();
  });
});

describe('filterObjectArray', () => {
  const list = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
  ];

  it('filterObjectArray', () => {
    const mockObjArray = [
      { asdf: { fld: 'potato' } },
      { asdf: { fld: 'apple' } },
    ];
    const result = filterObjectArray(mockObjArray, 'otat', ['asdf.fld']);
    expect(result.length).toEqual(1);
    expect(result[0].asdf.fld).toEqual('potato');
  });

  it('returns filtered array', () => {
    const filteredList = filterObjectArray(list, 'John', ['name']);
    expect(filteredList).toEqual([{ id: 1, name: 'John', age: 25 }]);
  });

  it('returns empty array if list is empty', () => {
    const filteredList = filterObjectArray([], 'John', ['name']);
    expect(filteredList).toEqual([]);
  });
});

describe('searchObject', () => {
  const obj = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
  };

  it('should return true if terms is empty', () => {
    expect(searchObject(obj, '', ['name', 'email'])).toBe(true);
  });

  it('should return true if all terms are found in any of the specified paths', () => {
    expect(searchObject(obj, 'john doe', ['name', 'email'])).toBe(true);
    expect(searchObject(obj, 'doe john', ['name', 'email'])).toBe(true);
    expect(searchObject(obj, 'example', ['name', 'email'])).toBe(true);
    expect(searchObject(obj, 'jo ex', ['name', 'email'])).toBe(true);
  });

  it('should return false if at least one term is not found in any of the specified paths', () => {
    expect(searchObject(obj, 'jane doe', ['name', 'email'])).toBe(false);
    expect(searchObject(obj, 'john jane', ['name', 'email'])).toBe(false);
    expect(searchObject(obj, 'example jane', ['name', 'email'])).toBe(false);
    expect(searchObject(obj, 'jo ex jane', ['name', 'email'])).toBe(false);
  });

  it('should return false if paths is empty or contains non-existent properties', () => {
    expect(searchObject(obj, 'john', [])).toBe(false);
    expect(searchObject(obj, 'john', ['address', 'age'])).toBe(false);
  });
});

describe('hasDiff', () => {
  it('should return true if objects have different values', () => {
    const obj1 = { a: 1, b: '2' };
    const obj2 = { a: 1, b: '3' };
    expect(hasDiff(obj1, obj2)).toBe(true);
  });

  it('should return false if objects have same values', () => {
    const obj1 = { a: 1, b: '2' };
    const obj2 = { a: 1, b: '2' };
    expect(hasDiff(obj1, obj2)).toBe(false);
  });

  it('should return true if one object is undefined', () => {
    const obj1 = { a: 1, b: '2' };
    expect(hasDiff(obj1, undefined)).toBe(true);
    expect(hasDiff(undefined, obj1)).toBe(true);
  });

  it('should return false if both objects are undefined', () => {
    expect(hasDiff(undefined, undefined)).toBe(false);
  });
});

describe('isNumeric', () => {
  it('should return true for numeric inputs', () => {
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(-1)).toBe(true);
    expect(isNumeric(1.23)).toBe(true);
    expect(isNumeric(-1.23)).toBe(true);
    expect(isNumeric('1')).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('-1')).toBe(true);
    expect(isNumeric('1.23')).toBe(true);
    expect(isNumeric('-1.23')).toBe(true);
  });

  it('should return false for non-numeric inputs', () => {
    expect(isNumeric('foo')).toBe(false);
    expect(isNumeric(true)).toBe(false);
    expect(isNumeric(false)).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric([])).toBe(false);
  });
});

describe('zeroIsOk', () => {
  test('should return defaultTo if val is undefined', () => {
    const result = zeroIsOk(undefined, 'default');
    expect(result).toEqual('default');
  });

  test('should return defaultTo if val is null', () => {
    const result = zeroIsOk(null, 'default');
    expect(result).toEqual('default');
  });

  test('should return val if val is truthy', () => {
    const result = zeroIsOk('hello', 'default');
    expect(result).toEqual('hello');
  });

  test('should return 0 if val is 0', () => {
    const result = zeroIsOk(0, 'default');
    expect(result).toEqual(0);
  });

  test('should return val if val is a negative number', () => {
    const result = zeroIsOk(-10, 'default');
    expect(result).toEqual(-10);
  });

  test('should return val if val is a positive number', () => {
    const result = zeroIsOk(10, 'default');
    expect(result).toEqual(10);
  });

  test('should return val if val is a boolean', () => {
    const result = zeroIsOk(true, 'default');
    expect(result).toEqual(true);
  });

  test('should return val if val is an empty string', () => {
    const result = zeroIsOk('', 'default');
    expect(result).toEqual('');
  });
});

describe('isSet', () => {
  it('should return true if the value is set', () => {
    expect(isSet('')).toBe(true);
    expect(isSet(0)).toBe(true);
    expect(isSet(false)).toBe(true);
    expect(isSet([])).toBe(true);
    expect(isSet({})).toBe(true);
    expect(isSet(() => {})).toBe(true);
  });

  it('should return false if the value is not set', () => {
    expect(isSet(undefined)).toBe(false);
    expect(isSet(null)).toBe(false);
  });
});

describe('isNullOrEmpty', () => {
  it('should return true for null, undefined, empty strings, empty objects, and empty arrays', () => {
    expect(isNullOrEmpty(null)).toBe(true);
    expect(isNullOrEmpty(undefined)).toBe(true);
    expect(isNullOrEmpty('')).toBe(true);
    expect(isNullOrEmpty([])).toBe(true);
    expect(isNullOrEmpty({})).toBe(true);
  });

  it('should return false for non-empty strings, arrays, and objects, and 0 and false', () => {
    expect(isNullOrEmpty('foo')).toBe(false);
    expect(isNullOrEmpty([1, 2, 3])).toBe(false);
    expect(isNullOrEmpty({ foo: 'bar' })).toBe(false);
    expect(isNullOrEmpty(0)).toBe(false);
    expect(isNullOrEmpty(false)).toBe(false);
  });
});
