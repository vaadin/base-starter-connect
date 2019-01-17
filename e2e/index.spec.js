const {describe, it, before} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

import {pollUntilTruthy} from '@theintern/leadfoot';

describe('starter application', () => {
  describe('index page', () => {
    let page;

    before(async context => {
      page = context.remote.get('');
    });

    describe('login view', () => {
      it('should show login view', async() => {
        await page.execute(function() { window.localStorage.clear(); });
        await page.get('');
        await pollUntilTruthy(function() {
          return document.getElementById('login');
        }).call(page);
      });

      it('should authenticate', async() => {
        await page.execute(function() {
          const login = document.getElementById('login');
          if (login) {
            login.shadowRoot.querySelector('#username').value = 'test_login';
            login.shadowRoot.querySelector('#password').value = 'test_password';
            login.shadowRoot.querySelector('#submit').click();
          }
        });
      });
    });

    describe('greeter view', () => {
      let greeterView;
      it('should show greeter view', async() => {
        await pollUntilTruthy(function() {
          return document.querySelector('greeter-view');
        }).apply(page);
        greeterView = page.findByTagName('greeter-view');
      });

      it('should have an empty greeting message', async() => {
        await greeterView
          .findById('greetingLabel').getVisibleText().then(text => {
            expect(text).to.be.empty;
          });
      });

      it('should show the greeting server message', async() => {
        await greeterView
          .findById('greet').click();
        await pollUntilTruthy(function(text) {
          return document.getElementById('greetingLabel').textContent === text;
        }, ['Hello, test_login!']).apply(page);
      });
    });
  });
});
