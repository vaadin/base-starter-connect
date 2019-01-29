import {LoginView} from './login-view.js';
import {LoginController} from './login-controller.js';

import {StatusController} from './status-controller.js'
import {StatusView} from './status-view.js';

async function main() {
  const loginController = new LoginController(new LoginView(document.body));
  await loginController.loginAction();
  new StatusController(new StatusView(document.body));
}

main();
