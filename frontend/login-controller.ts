import {LoginView} from './login-view';
import client from './generated/connect-client.default';
import {Credentials} from '@vaadin/connect';

export class LoginController {
  public loginView: LoginView;

  /**
   * @param loginView the login view instance
   */
  constructor(loginView: LoginView) {
    this.loginView = loginView;
  }

  /**
   * User credentials for Vaadin Connect client
   */
  async credentials(): Promise<Credentials> {
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
  async loginAction(): Promise<void> {
    client.credentials = this.credentials.bind(this);
    while (!client.token) {
      await client.login();
    }
  }
}
