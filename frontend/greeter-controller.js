import * as greeterService from './generated/GreeterService.js';
import client from './generated/connect-client.default.js';

export class GreeterController {
  /**
   * @param {GreeterView} greeterView the greeter view instance
   */
  constructor(greeterView) {
    this.greeterView = greeterView;
    this.greeterView.onGreet = this.greetAction.bind(this);
    this.greeterView.attached = true;
  }

  /**
   * Calls the backend method and shows the result.
   */
  async greetAction() {
    const name = client.token.user_name;
    this.greeterView.greeting = await greeterService.greet(name);
  }
}
