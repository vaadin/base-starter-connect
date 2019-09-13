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

@customElement('form-validation')
export default class FormValidation extends LitElement {
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

    .error {
      background-color: var(--lumo-error-color-10pct);
      padding: var(--lumo-space-m);
      padding-left: var(--lumo-size-m);
      border-radius: var(--lumo-border-radius);
      margin-top: var(--lumo-space-m);
      margin-bottom: var(--lumo-space-s);
      color: var(--lumo-error-text-color);

      font-size: var(--lumo-font-size-s);
      line-height: var(--lumo-line-height-s);
      opacity: 0.9;
    }
  `;

  render() {
    const passwordRepeatedCorrectly = values => {
      if (values.password !== values.passwordRepeated) {
        return `Please check that you've repeated the password correctly.`;
      }
    };

    const form = {
      submit: () => {},
      pristine: true,
      submitting: false,
      error: true,
      errorMessage: `Please check that you've repeated the password correctly.`
    };

    return html`
      <h1>Vaadin Form - Form validation</h1>

      <form>
        <div>
          <label>Password <input type="password" name="password"></label>
        </div>

        <div>
          <label>Repeat password <input type="password" name="passwordRepeated"></label>
        </div>

        ${form.error && html`<p class="error">${form.errorMessage}</p>`}

        <button @click=${form.submit}
          ?disabled=${form.pristine || form.submitting || form.error}
        >
          Submit
        </button>
      </form>
    `;
  }
}
