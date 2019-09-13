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

@customElement('basic-form')
export default class BasicForm extends LitElement {
  static styles = css`
    ${color}
    ${typography}

    h1 {
      text-align: center;
    }

    form {
      background-color: #fafbfc;
      max-width: 500px;
      margin: 10px auto;
      padding: 20px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }
  `;

  render() {
    const form = {
      submit: () => {},
      pristine: true,
      submitting: false,
      error: false
    };

    return html`
      <h1>Vaadin Form - Basic form</h1>

      <form>
        <div>
          <label>First Name
            <input type="text" name="firstName" placeholder="First Name" maxlength="16">
          </label>
        </div>

        <button @click=${form.submit}
          ?disabled=${form.pristine || form.submitting || form.error}
        >
          Submit
        </button>
      </form>
    `;
  }
}
