import '@vaadin/vaadin-login/vaadin-login-overlay.js';

/**
 * A login form with <vaadin-login-overlay>
 */
export class LoginView {
  private $parentNode: Node;
  private $vaadinLoginOverlay: any;

  /**
   * @param {Node} parentNode the DOM parent for the greeter view
   */
  constructor(parentNode: Node = document.body) {
    this.$parentNode = parentNode;
    this.$vaadinLoginOverlay = (parentNode.ownerDocument || document)
      .createElement('vaadin-login-overlay') as any;
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

  get attached(): boolean {
    return this.$vaadinLoginOverlay.opened;
  }

  set attached(value: boolean) {
    if (value) {
      this.$parentNode.appendChild(this.$vaadinLoginOverlay);
      this.$vaadinLoginOverlay.opened = true;
    } else {
      this.$vaadinLoginOverlay.opened = false;
      this.$parentNode.removeChild(this.$vaadinLoginOverlay);
    }
  }

  get disabled(): boolean {
    return this.$vaadinLoginOverlay.disabled;
  }

  set disabled(value: boolean) {
    this.$vaadinLoginOverlay.disabled = value;
  }

  set afterNextLogin(callback: (detail: any) => void) {
    this.$vaadinLoginOverlay.addEventListener('login', (e: CustomEvent) => {
      callback(e.detail);
    }, {once: true});
  }
}
