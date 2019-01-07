const {describe, it, beforeEach, afterEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');
const {sinon} = intern.getPlugin('sinon');
const {proxyquire} = intern.getPlugin('proxyquire');

const greet = sinon.stub();
greet.withArgs('Jude').resolves('Hey Jude!');
greet.rejects(new TypeError('missing argument "name"'));

// Import the unit while stubbing dependencies
const {GreeterController} = proxyquire.noCallThru()(
  '../greeter-controller.js',
  {
    // Stub GreeterService with a `greet` method
    './generated/GreeterService.js': {greet}
  }
);

describe('GreeterController', () => {
  let greeterView, greeterController;

  beforeEach(() => {
    greeterView = {};
    greeterController = new GreeterController(greeterView);
  });

  afterEach(() => {
    greet.resetHistory();
  });

  describe('greetAction', () => {
    it('should be called from view.onGreet', () => {
      sinon.spy(GreeterController.prototype, 'greetAction');
      try {
        greeterController = new GreeterController(greeterView);
        greeterView.onGreet();
        expect(greeterController.greetAction).to.be.calledOnce;
      } finally {
        GreeterController.prototype.greetAction.restore();
      }
    });

    it('should not greet if name is empty', async() => {
      expect(greeterView.greeting).to.be.undefined;
      greeterView.name = '';
      await greeterController.greetAction();
      expect(greet).to.not.be.called;
      expect(greeterView.greeting).to.contain('Enter a name first!');
    });

    it('should greet with a name', async() => {
      greeterView.name = 'Jude';
      await greeterController.greetAction();
      expect(greet).to.be.calledOnce;
      expect(greet).to.be.calledWithExactly('Jude');
      expect(greeterView.greeting).to.contain('Hey Jude!');
    });
  });
});
