const {describe, it, beforeEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

import {pollUntil} from '@theintern/leadfoot';

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
        .execute(`window.localStorage.clear()`)
        .execute(`document.getElementById('nameInput').value = 'Sponge Bob'`)
        .findById('greet').click();
      await pollUntil(() => document.getElementById('login') !== null);
      await page.execute(() => {
        const login = document.getElementById('login');
        login.shadowRoot.querySelector('#username').value = 'test_login';
        login.shadowRoot.querySelector('#password').value = 'test_password';
        login.shadowRoot.querySelector('#submit').click();
      });
      await pollUntil(
        text => document.getElementById('greeting').textContent === text,
        'Hello, Sponge Bob!'
      );
    });
  });
});
