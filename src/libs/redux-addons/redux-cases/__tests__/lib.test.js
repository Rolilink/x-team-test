import { createCase, createCases } from '../';


describe('#createCase', () => {
  it('should return a case function when receiving a function as parameter', () => {
    const caseFn = jest.fn();

    expect(typeof createCase(caseFn)).toBe('function');
  });

  it('should return the same function it receives as a parameter when it receives a function', () => {
    const caseFn = jest.fn();

    expect(createCase(caseFn)).toEqual(caseFn);
  });

  it('should return a case function when receiving an array of functions as parameter', () => {
    const caseFns = [jest.fn(), jest.fn()];

    expect(typeof createCase(caseFns)).toBe('function');
  });

  it('should return a case function that composes all the functions sent in the array', () => {
    const expectedState = {
      a: 1,
      b: 2,
      c: 3,
    };
    const aFn = jest.fn(state => ({ ...state, a: 1 }));
    const bFn = jest.fn(state => ({ ...state, b: 2 }));
    const cFn = jest.fn(state => ({ ...state, c: 3 }));

    const caseFn = createCase([aFn, bFn, cFn]);

    expect(caseFn({})).toEqual(expectedState);
  });

  it(
    'when calling the returned function with an action that action should be received by all the composing cases',
    () => {
      const aFn = jest.fn(state => state);
      const bFn = jest.fn(state => state);
      const action = { type: 'type' };

      const caseFn = createCase([aFn, bFn]);

      caseFn({}, action);

      expect(aFn).toHaveBeenLastCalledWith({}, action);
      expect(bFn).toHaveBeenLastCalledWith({}, action);
    },
  );
});

describe('#createCases', () => {
  it('should return an object of cases function when receiving a well formatted object', () => {
    const cases = createCases({
      a: [jest.fn(), jest.fn()],
      b: jest.fn(),
    });

    expect(cases).toHaveProperty('a');
    expect(cases).toHaveProperty('b');
  });
});
