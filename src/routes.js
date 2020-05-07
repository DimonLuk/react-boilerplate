import SignIn from "./modules/Auth/SignIn";
import Register from "./modules/Auth/Register";
import Catalog from "./modules/Catalog/Catalog";

export const REST_AUTH = `/rest-auth`;
export const PASSWORD = `/password`;
export const RESET = `/reset`;
export const REGISTRATION = `/registration`;
export const LOGIN = `/login`;
export const LOGOUT = "/logout";
export const CATALOG = "/catalog";

export const CLIENT_ROUTES = [
  {
    route: LOGIN,
    component: SignIn,
    exact: true,
  },
  {
    route: REGISTRATION,
    component: Register,
    exact: true,
  },

  {
    route: CATALOG,
    component: Catalog,
    exact: true,
  },

  {
    route: "/",
    component: SignIn,
  },
];
