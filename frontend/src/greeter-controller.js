import {greet} from './generated/GreeterService.js';

export class GreeterController {
  /**
   * @param {GreeterView} greeterView the greeter view instance
   */
  constructor(greeterView) {
    this.greeterView = greeterView;
    this.greeterView.onGreet = this.greet.bind(this);
  }

  /**
   * Calls the backend method and shows the result.
   */
  async greet() {
    const name = this.greeterView.name;
    if (!name) {
      this.greeterView.greeting = "Enter a name first!";
    } else {
      this.greeterView.greeting = await greet(name);
    }
  }
}
