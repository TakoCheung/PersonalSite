const {expect} = require('chai');
const sinon = require('sinon');
const admin = require('firebase-admin');
const functionsTest = require('firebase-functions-test')();

function loadFunction(returnVal) {
  sinon.stub(admin, 'initializeApp');
  const firestoreFn = () => returnVal;
  firestoreFn.FieldValue = {arrayUnion: () => ({})};
  sinon.stub(admin, 'firestore').get(() => firestoreFn);
  const fn = require('./index');
  return fn;
}

describe('saveData', () => {
  afterEach(() => {
    functionsTest.cleanup();
    sinon.restore();
    delete require.cache[require.resolve('./index')];
  });

  it('returns 405 when method is not POST', async () => {
    const myFunctions = loadFunction({});
    const req = {method: 'GET', body: {}};
    const res = mockResponse();
    await myFunctions.saveData(req, res);
    expect(res.status.calledWith(405)).to.be.true;
    expect(res.send.calledWith('Method Not Allowed')).to.be.true;
  });

  it('saves data and returns 200 on POST', async () => {
    const updateStub = sinon.stub().resolves();
    const querySnapshot = {
      forEach: (cb) => cb({ref: {update: updateStub}, id: 'doc1'})
    };
    const collectionStub = {get: sinon.stub().resolves(querySnapshot)};
    const myFunctions = loadFunction({collection: sinon.stub().returns(collectionStub)});
    const req = {method: 'POST', body: {channel_post: {text: 'hello'}}};
    const res = mockResponse();
    await myFunctions.saveData(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWith({message: 'Data saved successfully'})).to.be.true;
  });
});

function mockResponse() {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res;
}
