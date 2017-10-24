import createRandomID from '../../libs/createRandomID';

function generateAd(lastAd) {
  // Creates a random Id
  let newAd = createRandomID();

  // Recreate random Id until the Id created is different from the last id
  // on the ad state
  while (newAd === lastAd) {
    newAd = createRandomID();
  }

  return newAd;
}

export default generateAd;
