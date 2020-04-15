import SignIn from "./modules/Auth/SignIn";
import SignUp from "./modules/Auth/SignUp";
import Register from "./modules/Auth/Register";
import ForgotPassword from "./modules/Auth/ForgotPassword";

const REST_AUTH = `/rest-auth`;
const PASSWORD = `/password`;
const RESET = `/reset`;
const REGISTRATION = `/registration`;
const LOGIN = `/login`;
const LOGOUT = "/logout";
const FORGOT_PASSWORD = "/forgotpassword";

export const CLIENT_ROUTES = [
  {
    route: LOGIN,
    component: SignIn,
    exact: true,
  },
  {
    route: LOGOUT,
    component: SignUp,
    exact: true,
  },
  {
    route: REGISTRATION,
    component: Register,
    exact: true,
  },
  {
    route: FORGOT_PASSWORD,
    component: ForgotPassword,
    exact: true,
  },
];
