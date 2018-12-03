const {describe, it, beforeEach, afterEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');
const {sinon} = intern.getPlugin('sinon');
const {proxyquire} = intern.getPlugin('proxyquire');

// Mock greet method of the GreeterService
const greet = sinon.stub();
greet.withArgs('Jude').resolves('Hey Jude!')
greet.rejects(new TypeError('missing argument "name"'));

// Import the unit while stubbing dependencies
const {GreeterController} = proxyquire.noCallThru()(
  '../src/greeter-controller.js',
  {
    // Stub GreeterService with a `greet` method
    './generated/GreeterService.js': {greet},

    // Stub Vaadin Connect client
    './generated/connect-client.default.js': {
      default: {
        call: sinon.stub().rejects(new TypeError('not stubbed'))
      }
    }
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

  describe('greet method', () => {
    it('should be set for onGreet view action', () => {
      sinon.spy(GreeterController.prototype, 'greet');
      try {
        greeterController = new GreeterController(greeterView);
        greeterView.onGreet();
        expect(greeterController.greet).to.be.calledOnce;
      } finally {
        GreeterController.prototype.greet.restore();
      }
    });

    it('should not greet if name is empty', async() => {
      expect(greeterView.greeting).to.be.undefined;
      greeterView.name = '';
      await greeterController.greet();
      expect(greet).to.not.be.called;
      expect(greeterView.greeting).to.contain('Enter a name first!');
    });

    it('should greet with a name', async() => {
      greeterView.name = 'Jude';
      await greeterController.greet();
      expect(greet).to.be.calledOnce;
      expect(greet).to.be.calledWithExactly('Jude');
      expect(greeterView.greeting).to.contain('Hey Jude!');
    });
  });
});
