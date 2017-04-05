// #TODO: add pending tests

describe('PaginationActions#setPage', () => {
  it('should return action with type SET_PAGE');
  it('should return action with a page integer');
});

describe('PaginationActions#setLimit', () => {
  it('should return action with type SET_LIMIT');
  it('should return action with a limit integer');
});

describe('PaginationActions#setSkip', () => {
  it('should return action with type SET_SKIP');
  it('should return action with a skip integer');
});

describe('PaginationActions#getPaginationParams', () => {
  it('should return a valid url when there is no page');
  it('should return a valid url when there is no limit');
  it('should return a valid url when there is no skip');
  it('should return a valid url when there is no page and there is a limit');
  it('should return a valid url when a limit and an skip is provided');
});
