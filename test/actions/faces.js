// #TODO: add pending tests

describe('FacesActions#addFaces', () => {
  it('should return action with type ADD_FACES');
  it('should return action with a faces array');
});

describe('FacesActions#fetchFaces', () => {
  it('should eventually call fetchServer for faces');
  it('should paginate results');
  it('should eventually dispatch addFaces action with faces');
});

describe('FacesActions#maybeFetchFaces', () => {
  it("shouldn't call fetchServer while fetching");
  it('should dispatch fetchFaces');
});
