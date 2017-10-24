import networkFactory from './factory';

export default (state, initialNetworkState) =>
  ({ ...state, network: networkFactory(initialNetworkState) });
