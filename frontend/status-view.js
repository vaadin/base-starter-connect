import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-button/vaadin-button.js';

/**
 * Maps the view properties to the DOM.
 */
export class StatusView {
  /**
   * @param {Node} parentNode the DOM parent for the status view
   */
  constructor(parentNode = document.body) {
    this.$parentNode = parentNode;
    this.$viewNode = parentNode.ownerDocument.createElement('status-view');
    this.$viewNode.innerHTML = `
      <vaadin-text-field id="newStatusInput" label="New status"></vaadin-text-field>
      &#32;
      <vaadin-button id="update">Update status</vaadin-button>
      <br>
      <label id="statusLabel"></label>
    `;
    this.$newStatusInput = this.$viewNode.querySelector('#newStatusInput');
    this.$updateButton = this.$viewNode.querySelector('#update');
    this.$statusLabel = this.$viewNode.querySelector('#statusLabel');
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
  get newStatus() {
    return this.$newStatusInput.value;
  }

  set newStatus(value) {
    this.$newStatusInput.value = value;
  }

  /**
   * @type {string}
   */
  get status() {
    return this.$statusLabel.textContent;
  }

  set status(value) {
    this.$statusLabel.textContent = value;
  }

  /**
   * @type {Function}
   */
  get onUpdate() {
    return this.$updateButton.onclick;
  }

  set onUpdate(fn) {
    this.$updateButton.onclick = fn;
  }
}
