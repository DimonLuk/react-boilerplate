import client from "./Api.service";
class AuthService {
  register = () => {};

  verifyEmail = () => {};

  login = () => {
    client["rest-auth/login/"]["rest-auth_login_create"]({});
  };

  logout = () => {
    client["rest-auth/login/"]["rest-auth_login_create"]({});
  };

  forgotPassword = () => {};

  changePassword = () => {};

  resetPassword = () => {};

  confirmReset = () => {};
}
export default AuthService;
