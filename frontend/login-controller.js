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
    this.loginView.disabled = false;
    return new Promise(resolve => {
      this.loginView.afterNextLogin = ({username, password}) => {
        this.loginView.disabled = true;
        resolve({username, password, stayLoggedIn: true});
      };
    });
  }

  /**
   * Ensure the default client is authenticated
   */
  async loginAction() {
    // Try login early to avoid flashing login view
    await client.login();
    if (client.token) {
      // Successful login without credentials (refresh_token), skip login view
      return;
    }

    client.credentials = this.credentials.bind(this);
    this.loginView.attached = true;
    while (!client.token) {
      await client.login();
    }
    this.loginView.attached = false;
  }
}
