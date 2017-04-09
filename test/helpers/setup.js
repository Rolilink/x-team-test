import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
global.expect = chai.expect;
global.sinon = sinon;
