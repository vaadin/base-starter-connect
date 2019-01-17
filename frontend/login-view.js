import '@vaadin/vaadin-login/vaadin-login-overlay.js';

/**
 * A login form with <vaadin-login-overlay>
 */
export class LoginView {
  /**
   * @param {Node} parentNode the DOM parent for the greeter view
   */
  constructor(parentNode = document.body) {
    this.$parentNode = parentNode;
    this.$vaadinLoginOverlay = parentNode.ownerDocument.createElement('vaadin-login-overlay');
    this.$vaadinLoginOverlay.i18n = {
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
  }

  /**
   * @type {boolean}
   */
  get attached() {
    return this.$vaadinLoginOverlay.opened;
  }

  set attached(value) {
    if (value) {
      this.$parentNode.appendChild(this.$vaadinLoginOverlay);
      this.$vaadinLoginOverlay.opened = true;
    } else {
      this.$vaadinLoginOverlay.opened = false;
      this.$parentNode.removeChild(this.$vaadinLoginOverlay);
    }
  }

  /**
   * @type {boolean}
   */
  get disabled() {
    return this.$vaadinLoginOverlay.disabled;
  }

  set disabled(value) {
    this.$vaadinLoginOverlay.disabled = value;
  }

  /**
   * @type {Function}
   */
  set afterNextLogin(callback) {
    this.$vaadinLoginOverlay.addEventListener('login', e => {
      callback(e.detail);
    }, {once: true});
  }
}
