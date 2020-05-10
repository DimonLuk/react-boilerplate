import SignIn from "./modules/Auth/SignIn";
import Register from "./modules/Auth/Register";
import Quizes from "./modules/Quizes/Quizes";
import QuizForm from "./modules/Quizes/Quiz/QuizForm/QuizForm";

export const REST_AUTH = `/rest-auth`;
export const PASSWORD = `/password`;
export const RESET = `/reset`;
export const REGISTRATION = `/registration`;
export const LOGIN = `/login`;
export const LOGOUT = "/logout";
export const QUIZES = "/quizes";

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
    route: QUIZES,
    component: Quizes,
    exact: true,
  },
  {
    route: `${QUIZES}/:id`,
    component: QuizForm,
    exact: true,
  },

  {
    route: "/",
    component: SignIn,
  },
];
