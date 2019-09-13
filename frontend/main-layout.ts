import {LitElement, customElement, html, css} from 'lit-element';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab.js';

import {color, typography} from './theme';

@customElement('main-layout')
export class MainLayout extends LitElement {

  static styles = css`
    ${color}
    ${typography}

    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <vaadin-tabs>
        <vaadin-tab><a href="/">Home</a></vaadin-tab>
        <vaadin-tab><a href="/basic-form">Basic Form</a></vaadin-tab>
        <vaadin-tab><a href="/form-validation">Form Validation</a></vaadin-tab>
        <vaadin-tab><a href="/field-validation">Field Validation</a></vaadin-tab>
        <vaadin-tab><a href="/vaadin-components">Vaadin Components</a></vaadin-tab>
      </vaadin-tabs>
      <slot></slot>
    `;
  }
}
