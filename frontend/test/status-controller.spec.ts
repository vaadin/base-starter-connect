/// <reference types="intern" />
import {StatusController as _StatusController} from '../status-controller';

const {describe, it, beforeEach, afterEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');
const {sinon} = intern.getPlugin('sinon');
const {proxyquire} = intern.getPlugin('proxyquire');

const setStatus = sinon.stub();

const update = sinon.stub();
update.withArgs('good').resolves('You are good!');
update.rejects(new TypeError('missing argument "newStatus"'));

// Import the unit while stubbing dependencies
const {StatusController} = proxyquire.noCallThru()(
  '../status-controller',
  {
    // Stub StatusService with a `update` method
    './generated/StatusService': {update}
  }
);

describe('StatusController', () => {
  let statusController: _StatusController;

  beforeEach(() => {
    statusController = new StatusController(setStatus);
  });

  afterEach(() => {
    setStatus.resetHistory();
    update.resetHistory();
  });

  describe('updateAction', () => {
    it('should not update if newStatus is empty', async() => {
      expect(setStatus).to.not.be.called;
      await statusController.updateAction('');
      expect(update).to.not.be.called;
      expect(setStatus).to.be.calledOnce;
      expect(setStatus).to.be.calledWithExactly('Enter a new status first!');
    });

    it('should update with a name', async() => {
      await statusController.updateAction('good');
      expect(update).to.be.calledOnce;
      expect(update).to.be.calledWithExactly('good');
      expect(setStatus).to.be.calledOnce;
      expect(setStatus).to.be.calledWithExactly('You are good!');
    });
  });
});
