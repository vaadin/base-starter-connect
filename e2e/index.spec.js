const {describe, it, beforeEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

describe('starter application', () => {
  describe('index page', () => {
    let page, greeting, nameInput;

    beforeEach(context => {
      page = context.remote.get('');
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
        .execute(`document.getElementById('nameInput').value = 'Sponge Bob'`)
        .findById('greet').click().end()
        .sleep(2000)
        .execute(`document.getElementById('login').shadowRoot.querySelector('#username').value = 'test_login'`)
        .execute(`document.getElementById('login').shadowRoot.querySelector('#password').value = 'test_password'`)
        .execute(`document.getElementById('login').shadowRoot.querySelector('#submit').click()`)
        .sleep(2000)
        .findById('greeting').getVisibleText().then(text => {
          expect(text).to.equal('Hello, Sponge Bob!');
        });
    });
  });
});
