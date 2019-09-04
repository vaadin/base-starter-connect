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
