import {LoginView} from './login-view.js';
import {LoginController} from './login-controller.js';

import {GreeterController} from './greeter-controller.js'
import {GreeterView} from './greeter-view.js';

async function main() {
  const loginController = new LoginController(new LoginView(document.body));
  await loginController.loginAction();
  new GreeterController(new GreeterView(document.body));
}
main();
