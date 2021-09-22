import _ from "lodash";

type StringFormatter = (_: string) => string;

// TODO: replace type any with recursive type.
// typescript 3.7 now supports this, but our stack with babel doesn't, so `yarn start` is broken.
// https://babeljs.io/blog/2019/11/05/7.7.0
// type JSONValue = string | number | boolean | null | {[key: string]: JSONValue} | JSONValue[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JSONValue = any;

function _deepMapKeys(obj: JSONValue, transformKey: StringFormatter): JSONValue {
  if (Array.isArray(obj)) {
    return obj.map((item) => _deepMapKeys(item, transformKey));
  }
  if (_.isPlainObject(obj)) {
    return _.transform(
      obj,
      (acc: { [index: string]: JSONValue }, value: JSONValue, key: string) => {
        acc[transformKey(key)] = _deepMapKeys(value, transformKey);
      }
    );
  }
  return obj;
}

export const deepCamelCaseKeys = (obj: JSONValue): JSONValue => _deepMapKeys(obj, _.camelCase);

export const deepSnakeCaseKeys = (obj: JSONValue): JSONValue => _deepMapKeys(obj, _.snakeCase);

export const deepTrim = (obj: JSONValue): JSONValue => {
  if (!obj) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepTrim);
  }

  switch (typeof obj) {
    case "string":
      return obj.trim();
    case "object":
      return _.mapValues(obj, deepTrim);
    default:
      return obj;
  }
};
