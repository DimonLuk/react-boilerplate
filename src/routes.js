import SignIn from "./modules/Auth/SignIn";
import SignUp from "./modules/Auth/SignUp";
import Register from "./modules/Auth/Register";
import ForgotPassword from "./modules/Auth/ForgotPassword";

const REST_AUTH = `rest-auth/`;
const PASSWORD = `password/`;
const RESET = `reset/`;
const REGISTRATION = `registration/`;
const LOGIN = `login/`;
const LOGOUT = "logout/";
const FORGOT_PASSWORD = "forgotpassword/";
const ROUTES = {
  AUTH: {
    LOGIN: `${REST_AUTH}${LOGIN}`,
    LOGOUT: `${REST_AUTH}logout/`,
    CHANGE_PASSWORD: `${REST_AUTH}${PASSWORD}change/`,
    RESET_PASSWORD: `${REST_AUTH}${PASSWORD}${RESET}`,
    CONFIRM_RESET: `${REST_AUTH}${PASSWORD}${RESET}confirm/`,
    REFRESH_TOKEN: `${REST_AUTH}refresh-token/`,
    REGISTRATION: `${REST_AUTH}${REGISTRATION}`,
    VERIFY_EMAIL: `${REST_AUTH}${REGISTRATION}verify-email/`
  },
  USER: `${REST_AUTH}user/`
};

export const CLIENT_ROUTES = [
  {
    route: LOGIN,
    component: SignIn
  },
  {
    route: LOGOUT,
    component: SignUp
  },
  {
    route: REGISTRATION,
    component: Register
  },
  {
    route: FORGOT_PASSWORD,
    component: ForgotPassword
  }
];
