import {
  css,
  unsafeCSS
} from 'lit-element';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

const styles = {
  color: css ``,
  typography: css ``
};

function domModuleToCssResult(module: Element) {
  return unsafeCSS(
    module.querySelector('template') !
    .content.querySelector('style') !
    .textContent);
}

document.head.querySelectorAll('dom-module').forEach(module => {
  switch (module.id) {
    case 'lumo-color':
      styles.color = domModuleToCssResult(module);
      break;
    case 'lumo-typography':
      styles.typography = domModuleToCssResult(module);
      break;
  }
});

export const {
  color,
  typography
} = styles;


const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="my-text-field-theme" theme-for="vaadin-text-field">
  <template>
    <style>
      :host([theme~="no-animation"]) [part="error-message"] {
        transition: none;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);