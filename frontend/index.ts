import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

import {
  Router
} from '@vaadin/router';
import './views/not-found-view';
import './views/simple-example';

const router = new Router(document.querySelector('#outlet'));
router.setRoutes([{
  path: '/',
  children: [{
    path: '/',
    component: 'simple-example'
  }, {
    path: '(.*)',
    component: 'not-found-view'
  }]
}]);
