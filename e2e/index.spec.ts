/// <reference types="intern" />
const {describe, it, before} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

import {pollUntilTruthy, Command, Element} from '@theintern/leadfoot';

describe('starter application', () => {
  describe('index page', () => {
    let page: Command<void>;

    before(async context => {
      await context.remote.session.setExecuteAsyncTimeout(30000);
      await context.remote.session.setFindTimeout(30000);
      page = context.remote.get('');
    });

    describe('login view', () => {
      let loginForm: Command<Element>;

      before(async() => {
        // Reload with clean localStorage
        await page.execute(function() { localStorage.clear(); });
        page = page.get('');
        await page;
      });

      it('should show login view', async() => {
        loginForm = page.findByTagName('vaadin-login-form');
        await loginForm;
      });

      it('should authenticate', async() => {
        await page.execute(function() {
          const loginForm = document.querySelector('vaadin-login-form');
          if (!loginForm) {
            throw new Error('Error: missing login form');
          }
          (loginForm.querySelector(
            '[name="username"]'
          ) as HTMLInputElement).value = 'user';
          (loginForm.querySelector(
            '[name="password"]'
          ) as HTMLInputElement).value = 'user';
          (loginForm.querySelector(
            '[part="vaadin-login-submit"]'
          ) as HTMLButtonElement).click();
        });
      });
    });

    describe('status view', () => {
      let statusView: Command<Element>;

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
          (document.querySelector('#newStatusInput') as HTMLInputElement)
            .value = 'ok';
        });
        await statusView.findById('update').click();
        await pollUntilTruthy(function(text) {
          return (document.querySelector('#statusLabel') as HTMLLabelElement)
            .textContent === text;
        }, ['Your status is: ok']).call(page);
      });
    });
  });
});
