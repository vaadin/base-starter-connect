import client from './generated/connect-client.default.js';

export class LoginController {
  /**
   * @param {LoginView} loginView the login view instance
   */
  constructor(loginView) {
    this.loginView = loginView;
  }

  /**
   * User credentials for Vaadin Connect client
   */
  async credentials() {
    this.loginView.attached = true;
    this.loginView.disabled = false;
    return new Promise(resolve => {
      this.loginView.afterNextLogin = ({username, password}) => {
        this.loginView.disabled = true;
        this.loginView.attached = false;
        resolve({username, password, stayLoggedIn: true});
      };
    });
  }

  /**
   * Ensure the default client is authenticated
   */
  async loginAction() {
    client.credentials = this.credentials.bind(this);
    while (!client.token) {
      await client.login();
    }
  }
}
