import {LitElement, customElement, html, css, property} from 'lit-element';
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

@customElement('field-validation')
export default class FieldValidation extends LitElement {

  @property() validating = false;
  @property() error = false;
  @property() errorMessage = '';

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

    .spinner,
    .spinner::after {
      border-radius: 50%;
      width: 16px;
      height: 16px;
    }
    .spinner {
      display: inline-block;
      font-size: 10px;
      position: relative;
      text-indent: -9999em;
      border-top: 0.4em solid rgba(21,117,243, 0.2);
      border-right: 0.4em solid rgba(21,117,243, 0.2);
      border-bottom: 0.4em solid rgba(21,117,243, 0.2);
      border-left: 0.4em solid #1575f3;
      transform: translateZ(0);
      animation: load8 1.1s infinite linear;
    }
    @keyframes load8 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .error {
      padding: 0;
      margin: 0;
      margin-bottom: 10px;
      border-radius: var(--lumo-border-radius);
      color: var(--lumo-error-text-color);

      font-size: var(--lumo-font-size-s);
      line-height: var(--lumo-line-height-s);
      opacity: 0.9;
    }
  `;

  render() {
    const nonBlank = value => {
      if (!value || `${value}`.trim() === '') {
        return `Please enter a non-blank username.`;
      }
    };

    const isAvailableName = async (value) => {
      const response = await fetch(`/validate/name/${encodeURIComponent(value)}`);
      const result = await response.json();
      if (result.error) {
        return `Please pick another name. '${value}' is not available.`;
      }
    };

    const form = {
      submit: () => {},
      pristine: true,
      submitting: false,
      error: true,
      errorMessage: `Please pick another name. '${'xxx'}' is not available.`
    };

    const field = {
      error: false,
      errorMessage: `Please pick another name. '${'xxx'}' is not available.`,
      validating: false,
      touched: true
    };

    return html`
      <h1>Vaadin Form - Field validation</h1>

      <form autocomplete="off">
        <input autocomplete="false" name="hidden" type="text" style="display:none;">
        <div>
          <label>
            Username
            <input type="text" name="username" @change=${this.onChange}>
            ${this.validating ? html`<div class="spinner">validating...</div>` : ``}
          </label>
          <p class="error">
            ${this.error && field.touched ? this.errorMessage : html`&nbsp;`}
          </p>
        </div>

        <button @click=${form.submit}
          ?disabled=${form.pristine || form.submitting || form.error}
        >
          Submit
        </button>
      </form>
    `;
  }

  onChange(e) {
    this.validating = true;
    const username = e.target.value;
    setTimeout(() => {
      this.validating = false;
      this.error = true;
      this.errorMessage = `Please pick another name. '${username}' is not available.`
    }, 1000);
  }
}
