// Este es el punto de entrada de tu aplicacion
// file main.js
import home from './templates/home.js';
import login from './templates/login.js';
import error from './error.js';
import register from './templates/register.js';
import wall from './templates/wall.js';
import { db } from './lib/firebase.js';

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/error', component: error },
  { path: '/register', component: register },
  { path: '/wall', component: wall },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);
  console.log('route', route);
  console.log('route.component', route.component);
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

// function returnHome(){ void
//   navigateTo(any)
// }

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
