import {LoginView} from './login-view';
import {LoginController} from './login-controller';

import {StatusController} from './status-controller'
import {StatusView} from './status-view';

async function main() {
  const loginController = new LoginController(new LoginView(document.body));
  await loginController.loginAction();
  new StatusController(new StatusView(document.body));
}

main();
