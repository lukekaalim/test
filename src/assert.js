// @flow strict
/*::
export type Assertion =  {|
  +title: string,
  +result: boolean,
  +because: Assertion[]
|}
*/

const createAssertion = (
  title/*: string*/,
  because/*: boolean | Assertion[]*/
)/*: Assertion*/ => {
  switch (typeof because) {
    case 'boolean':
      return { title, result: because, because: [] };
    case 'object':
      return { title, result: because.every(r => r.result),  because }
    default:
      (because/*: empty*/)
      throw new Error('Unknown reason for assertion result');
  }
}

const assert = createAssertion;

/*::
export type ComparableStruct =
  | $ReadOnlyArray<ComparableStruct>
  | number | boolean | string
  | null | void
  | { +[string]: ComparableStruct }
*/

const isStructurallyEqual = (a/*: mixed*/, b/*: mixed*/) => {
  if (Object.is(a, b))
    return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((a, i) => isStructurallyEqual(a, b[i]));
  if (typeof a === 'object' && typeof b === 'object')
    if (a !== null && b !== null) {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length)
        return false;
      return aKeys.every(key => isStructurallyEqual(a[key], b[key]));
    }
  return false;
};

const assertStruct = (structs/*: { [string]: ComparableStruct }*/)/*: Assertion*/ =>
  assert(
    Object.keys(structs).join(' structurally equals '),
    Object.values(structs).every((a, i, r) => isStructurallyEqual(a, r[Math.max(i - 1, 0)]) )
  )

const assertIs = (values/*: { [string]: mixed }*/)/*: Assertion*/ =>
  assert(
    Object.keys(values).join(' equals '),
    Object.values(values).every((a, i, r) => Object.is(a, r[Math.max(i - 1, 0)]) )
  )


module.exports = {
  createAssertion,
  assertStruct,
  assertIs,
  assert,
};
