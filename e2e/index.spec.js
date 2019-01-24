const {describe, it, before} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

import {pollUntilTruthy} from '@theintern/leadfoot';

describe('starter application', () => {
  describe('index page', () => {
    let page;

    before(async context => {
      await context.remote.session.setExecuteAsyncTimeout(30000);
      await context.remote.session.setFindTimeout(30000);
      page = context.remote.get('');
    });

    describe('login view', () => {
      let loginForm;

      before(async() => {
        // Reload with clean localStorage
        await page.execute(function() { localStorage.clear(); });
        page = page.get('');
        await page;
      });

      it('should show login view', async() => {
        loginForm = page.findById('login');
        await loginForm;
      });

      it('should authenticate', async() => {
        await page.execute(function() {
          const loginForm = document.querySelector('#login');
          loginForm.shadowRoot.querySelector('#username').value = 'test_login';
          loginForm.shadowRoot.querySelector('#password').value = 'test_password';
          loginForm.shadowRoot.querySelector('#submit').click();
        });
      });
    });

    describe('status view', () => {
      let statusView;

      it('should show status view', async() => {
        statusView = page.findByTagName('status-view');
        await statusView;
      });

      it('should have empty status message', async() => {
        const text = await statusView.findById('statusLabel').getVisibleText();
        expect(text).to.be.empty;
      });

      it('should show error message when input is empty', async() => {
        await statusView.findById('update').click();
        const text = await statusView.findById('statusLabel').getVisibleText();
        expect(text).to.equal('Enter a new status first!');
      });

      it('should update status on server', async() => {
        await page.execute(function() {
          document.querySelector('#newStatusInput').value = 'ok';
        });
        await statusView.findById('update').click();
        await pollUntilTruthy(function(text) {
          return document.querySelector('#statusLabel').textContent === text;
        }, ['Your status is: ok']).call(page);
      });
    });
  });
});
