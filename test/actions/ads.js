// #TODO: add pending tests

describe('AdsActions#addAd', () => {
  it('should return action with type ADD_AD');
  it('should return action with an AD id');
});

describe('AdsActions#generateAd', () => {
  it('should eventually dispatch addAd');
  it("shouldn't generate two consecutive similar ads");
  it('should call createRandomAdID to generate ads');
});

describe('AdsActions#createRandomAdID', () => {
  it('should return a random id');
});
