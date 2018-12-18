import '@vaadin/vaadin-login/vaadin-login-overlay';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-button/vaadin-button';
import client from './src/generated/connect-client.default.js';
import {GreeterController} from './src/greeter-controller.js';

const vaadinLoginOverlay = document.querySelector('vaadin-login-overlay');
vaadinLoginOverlay.i18n = {
  header: {
    title: 'Vaadin Connect starter',
  },
  form: {
    title: 'Authenticate',
    username: 'Username',
    password: 'Password',
    submit: 'Submit'
  },
  additionalInformation: '(use test_login and test_password to authenticate)'
};

client.credentials = (options = {}) => {
  vaadinLoginOverlay.opened = true;
  vaadinLoginOverlay.disabled = false;
  return new Promise(resolve => {
    vaadinLoginOverlay.addEventListener('login', e => {
      vaadinLoginOverlay.opened = false;
      resolve({username: e.detail.username, password: e.detail.password, stayLoggedIn: true});
    }, {once: true});
  });
};

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
