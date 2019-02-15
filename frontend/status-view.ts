import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-button/vaadin-button.js';

/**
 * Maps the view properties to the DOM.
 */
export class StatusView {
  private $parentNode: Node;
  private $viewNode: Element;
  private $newStatusInput: HTMLInputElement;
  private $updateButton: HTMLButtonElement;
  private $statusLabel: HTMLLabelElement;

  /**
   * @param {Node} parentNode the DOM parent for the status view
   */
  constructor(parentNode: Node = document.body) {
    this.$parentNode = parentNode;
    this.$viewNode = (parentNode.ownerDocument || document)
      .createElement('status-view');
    this.$viewNode.innerHTML = `
      <vaadin-text-field id="newStatusInput" label="New status"></vaadin-text-field>
      &#32;
      <vaadin-button id="update">Update status</vaadin-button>
      <br>
      <label id="statusLabel"></label>
    `;
    this.$newStatusInput = this.$viewNode
      .querySelector('#newStatusInput') as HTMLInputElement;
    this.$updateButton = this.$viewNode
      .querySelector('#update') as HTMLButtonElement;
    this.$statusLabel = this.$viewNode
      .querySelector('#statusLabel') as HTMLLabelElement;
  }

  get attached(): boolean {
    return this.$viewNode.isConnected;
  }

  set attached(value: boolean) {
    if (value) {
      this.$parentNode.appendChild(this.$viewNode);
    } else {
      this.$parentNode.removeChild(this.$viewNode);
    }
  }

  get newStatus(): string {
    return this.$newStatusInput.value;
  }

  set newStatus(value: string) {
    this.$newStatusInput.value = value;
  }

  get status(): string {
    return this.$statusLabel.textContent || '';
  }

  set status(value: string) {
    this.$statusLabel.textContent = value;
  }

  get onUpdate(): () => void {
    return this.$updateButton.onclick as () => void;
  }

  set onUpdate(fn: () => void) {
    this.$updateButton.onclick = fn;
  }
}
