import {LitElement, customElement, html, css} from 'lit-element';
import {render} from 'lit-html';

import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-item.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-button';

import {color, typography} from '../theme';

@customElement('simple-example')
export default class SimpleExample extends LitElement {
  static styles = css`
    ${color}
    ${typography}

    h1 {
      text-align: center;
    }

    form {
      max-width: 500px;
      margin: 10px auto;
      border: 1px solid #ccc;
      padding: 20px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      border-radius: 3px;
    }

    vaadin-form-item > * {
      width: 100%;
    }

    .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }

    .buttons > * {
      margin: 0 10px;
    }

    pre {
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  `;

  render() {
    const values = {},
      submitting = false,
      pristine = false;

    return html`
      <h1><code>lit-form</code> - Simple Example</h1>

      <form onSubmit=${this.handleSubmit}>
        <vaadin-form-layout>
          <vaadin-form-item>
            <label slot="label">First Name</label>
            <vaadin-text-field placeholder="First Name"></vaadin-text-field>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Last Name</label>
            <vaadin-text-field placeholder="Last Name"></vaadin-text-field>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Employed</label>
            <vaadin-checkbox></vaadin-checkbox>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Favorite Color</label>
            <vaadin-select .renderer=${
              (root: Element | DocumentFragment) => render(html`
              <vaadin-list-box>
                <vaadin-item value=""></vaadin-item>
                <vaadin-item value="#ff0000">❤️ Red</vaadin-item>
                <vaadin-item value="#00ff00">💚 Green</vaadin-item>
                <vaadin-item value="#0000ff">💙 Blue</vaadin-item>
              </vaadin-list-box>`, root)}>
            </vaadin-select>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Toppings</label>
            <vaadin-list-box multiple>
              <vaadin-item value="chicken">🐓 Chicken</vaadin-item>
              <vaadin-item value="ham">🐷 Ham</vaadin-item>
              <vaadin-item value="mushrooms">🍄 Mushrooms</vaadin-item>
              <vaadin-item value="cheese">🧀 Cheese</vaadin-item>
              <vaadin-item value="tuna">🐟 Tuna</vaadin-item>
              <vaadin-item value="pineapple">🍍 Pineapple</vaadin-item>
            </vaadin-list-box>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Sauces</label>
            <vaadin-checkbox value="ketchup">Ketchup</vaadin-checkbox>
            <vaadin-checkbox value="mustard">Mustard</vaadin-checkbox>
            <vaadin-checkbox value="mayonnaise">Mayonnaise</vaadin-checkbox>
            <vaadin-checkbox value="guacamole">Guacamole 🥑</vaadin-checkbox>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Best Stooge</label>
            <vaadin-radio-group theme="vertical">
              <vaadin-radio-button value="larry">Larry</vaadin-radio-button>
              <vaadin-radio-button value="moe">Moe</vaadin-radio-button>
              <vaadin-radio-button value="curly">Curly</vaadin-radio-button>
            </vaadin-radio-group>
          </vaadin-form-item>

          <vaadin-form-item>
            <label slot="label">Notes</label>
            <vaadin-text-area placeholder="Notes"></vaadin-text-area>
          </vaadin-form-item>
        </vaadin-form-layout>

        <div class="buttons">
          <vaadin-button theme="primary"
            .disabled=${submitting || pristine}
            @click=${this.handleSubmit}
          >
            Submit
          </vaadin-button>
          <vaadin-button
            .disabled=${submitting || pristine}
            @click=${this.handleReset}
          >
            Reset
          </button>
        </div>
        <pre>${JSON.stringify(values, [0], 2)}</pre>
      </form>
    `;
  }

  handleReset() {
    console.log('reset is not implemented');
  }

  handleSubmit() {
    console.log('submit is not implemented');
  }
}
