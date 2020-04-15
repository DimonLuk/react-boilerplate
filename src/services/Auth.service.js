import client from "./Api.service";

class AuthService {
  register = (userData) => {
    client["rest-auth/registration/"]["rest-auth_registration_create"](
      userData
    );
  };

  verifyEmail = (keyData) => {
    client["rest-auth/registration/verify-email/"][
      "rest-auth_registration_verify-email_create"
    ](keyData);
  };

  login = (userData) => {
    client["rest-auth/login/"]["rest-auth_login_create"](userData);
  };

  logout = () => {
    client["rest-auth/login/"]["rest-auth_logout_list"]();
  };

  changePassword = (passwordsData) => {
    client["rest-auth/password/change/"]["rest-auth_password_change_create"](
      passwordsData
    );
  };

  resetPassword = (emailData) => {
    client["rest-auth/password/reset/"]["rest-auth_password_reset_create"](
      emailData
    );
  };

  confirmReset = (confirmResetData) => {
    client["rest-auth/password/reset/confirm/"][
      "rest-auth_password_reset_confirm_create"
    ]({ ...confirmResetData, token: localStorage.token });
  };
}
export default AuthService;
