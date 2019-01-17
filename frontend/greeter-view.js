import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-button/vaadin-button.js';

/**
 * Maps the view properties to the DOM.
 */
export class GreeterView {
  /**
   * @param {Node} parentNode the DOM parent for the greeter view
   */
  constructor(parentNode = document.body) {
    this.$parentNode = parentNode;
    this.$viewNode = parentNode.ownerDocument.createElement('greeter-view');
    this.$viewNode.innerHTML = `
      <vaadin-button id="greet">Get a personal greeting</vaadin-button>
      <br>
      <label id="greetingLabel"></label>
    `;
    this.$greetingLabel = this.$viewNode.querySelector('#greetingLabel');
    this.$greetButton = this.$viewNode.querySelector('#greet');
  }

  /**
   * @type {boolean}
   */
  get attached() {
    return this.$viewNode.isConnected;
  }

  set attached(value) {
    if (value) {
      this.$parentNode.appendChild(this.$viewNode);
    } else {
      this.$parentNode.removeChild(this.$viewNode);
    }
  }

  /**
   * @type {string}
   */
  get greeting() {
    return this.$greetingLabel.textContent;
  }

  set greeting(value) {
    this.$greetingLabel.textContent = value;
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
