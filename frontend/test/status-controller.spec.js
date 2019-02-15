const {describe, it, beforeEach, afterEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');
const {sinon} = intern.getPlugin('sinon');
const {proxyquire} = intern.getPlugin('proxyquire');

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
  let statusView, statusController;

  beforeEach(() => {
    statusView = {};
    statusController = new StatusController(statusView);
  });

  afterEach(() => {
    update.resetHistory();
  });

  describe('updateAction', () => {
    it('should be called from view.onUpdate', () => {
      sinon.spy(StatusController.prototype, 'updateAction');
      try {
        statusController = new StatusController(statusView);
        statusView.onUpdate();
        expect(statusController.updateAction).to.be.calledOnce;
      } finally {
        StatusController.prototype.updateAction.restore();
      }
    });

    it('should not update if newStatus is empty', async() => {
      expect(statusView.newStatus).to.be.undefined;
      statusView.newStatus = '';
      await statusController.updateAction();
      expect(update).to.not.be.called;
      expect(statusView.status).to.contain('Enter a new status first!');
    });

    it('should update with a name', async() => {
      statusView.newStatus = 'good';
      await statusController.updateAction();
      expect(update).to.be.calledOnce;
      expect(update).to.be.calledWithExactly('good');
      expect(statusView.status).to.contain('You are good!');
    });
  });
});
