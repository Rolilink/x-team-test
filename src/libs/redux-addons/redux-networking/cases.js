import { createCases } from '../redux-cases';
import networkFactory from './factory';

const { setSuccess, setError, setFetching } = createCases({
  setSuccess: state => ({ ...state, network: networkFactory() }),
  setError: (state, { payload }) => ({ ...state, network: networkFactory({ error: payload }) }),
  setFetching: state => ({ ...state, network: networkFactory({ isFetching: true }) }),
});

export default {
  setSuccess,
  setError,
  setFetching,
};
