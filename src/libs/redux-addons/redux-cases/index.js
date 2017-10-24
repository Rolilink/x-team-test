export const createCase = (cases) => {
  // if it is a single case just return it
  if (typeof cases === 'function') {
    return cases;
  }

  // if is an array of cases compose it
  return (state, action) => (
    cases.reduce(
      (prevState, caseFn) => caseFn(prevState, action),
      state,
    ));
};

export const createCases = casesObject => (
  Object.keys(casesObject).reduce(
    (newObject, key) => ({ ...newObject, [key]: createCase(casesObject[key]) }),
    {},
  )
);
