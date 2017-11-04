export default (enhancers, initialStates) => (
  stateToEnhance => (enhancers.reduce(
    (state, enhancer, index) => enhancer(state, initialStates[index]),
    stateToEnhance,
  ))
);
