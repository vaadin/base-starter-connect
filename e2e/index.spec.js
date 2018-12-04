const {describe, it, beforeEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

describe('starter application', () => {
  describe('index page', () => {
    let page, greeting, nameInput;


    beforeEach(context => {
      page = context.remote.get('/index.html');
    });

    it('should have an empty greeting message', async() => {
      await page
        .findById('greeting').getVisibleText().then(text => {
          expect(text).to.be.empty;
        });
    });

    it('should show an error message when input is empty', async() => {
      await page
        .findById('greet').click().end()
        .findById('greeting').getVisibleText().then(text => {
          expect(text).to.equal('Enter a name first!');
        });
    });

    it('should show the greeting server message', async() => {
      await page
        .findById('nameInput').type('Sponge Bob').end()
        .findById('greet').click().end()
        .sleep(2500) // Wait for server response
        .findById('greeting').getVisibleText().then(text => {
          expect(text).to.equal('Hello, Sponge Bob!');
        });
    });
  });
});
