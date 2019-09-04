import {LitElement, customElement, html} from 'lit-element';

@customElement('not-found-view')
export default class NotFoundView extends LitElement {
  render() {
    return html`
      Nothing here. Go <a href="/">Home</a>.
    `;
  }
}
