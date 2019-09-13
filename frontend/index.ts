import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

import {
  Router
} from '@vaadin/router';
import './main-layout';
import './views/not-found-view';
import './views/simple-example';
import './views/basic-form';
import './views/form-validation';
import './views/field-validation';
import './views/vaadin-components';

const router = new Router(document.querySelector('#outlet'));
router.setRoutes([{
  path: '/',
  component: 'main-layout',
  children: [{
    path: '/',
    component: 'simple-example'
  }, {
    path: '/basic-form',
    component: 'basic-form'
  }, {
    path: '/form-validation',
    component: 'form-validation'
  }, {
    path: '/field-validation',
    component: 'field-validation'
  }, {
    path: '/vaadin-components',
    component: 'vaadin-components'
  }, {
    path: '(.*)',
    component: 'not-found-view'
  }]
}]);
