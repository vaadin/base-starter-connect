import {Router} from '@vaadin/router';

import './root-view.js';
import './user-view.js';

const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
  {path: '/',     component: 'root-view'},
  {path: '/user',  component: 'user-view'}
]);
