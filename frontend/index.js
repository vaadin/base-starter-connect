import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-button/vaadin-button.js';

import client from './src/generated/connect-client.default.js';
client.credentials = (options = {}) => {
  return {username: 'test_login', password: 'test_password'};
};

import {GreeterController} from './src/greeter-controller.js';

/**
 * Maps the view properties to the DOM.
 */
class GreeterView {
  /**
   * @param {Node} rootNode the DOM root of the greeter view
   */
  constructor(rootNode = document) {
    this.$greeting = rootNode.getElementById('greeting');
    this.$nameInput = rootNode.getElementById('nameInput');
    this.$greetButton = rootNode.getElementById('greet');
  }

  /**
   * @type {string}
   */
  get name() {
    return this.$nameInput.value;
  }

  set name(value) {
    this.$nameInput.value = value;
  }

  /**
   * @type {string}
   */
  get greeting() {
    return this.$greeting.textContent;
  }

  set greeting(value) {
    this.$greeting.textContent = value;
  }

  /**
   * @type {Function}
   */
  get onGreet() {
    return this.$greetButton.onclick;
  }

  set onGreet(fn) {
    this.$greetButton.onclick = fn;
  }
}

new GreeterController(new GreeterView());
