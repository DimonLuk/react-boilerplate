class AuthService {
  register = (userData) => {
    return window.client.apis["rest-auth"]
      ["rest_auth_registration_create"]({
        data: userData,
      })
      .then((loginResponse) => {
        window.client.authorizations.Bearer = `Bearer ${loginResponse.body.token}`;
        localStorage.RT_TOKEN = loginResponse.body.token;
        return loginResponse.body;
      });
  };

  verifyEmail = (keyData) => {
    return window.client.apis["rest-auth"][
      "rest_auth_registration_verify-email_create"
    ](keyData);
  };

  login = (userData) => {
    return window.client.apis["rest-auth"]
      ["rest_auth_login_create"]({
        data: userData,
      })

      .then((loginResponse) => {
        window.client.authorizations.Bearer = `Bearer ${loginResponse.body.token}`;
        localStorage.RT_TOKEN = loginResponse.body.token;
        return loginResponse.body;
      });
  };

  logout = () => {
    return window.client.apis["rest-auth"]
      ["rest_auth_logout_create"]()
      .finally(() => {
        window.client.authorizations = {};
        localStorage.removeItem("RT_TOKEN");
        localStorage.removeItem("user");
      });
  };

  changePassword = (passwordsData) => {
    return window.client.apis["rest-auth/password/change/"][
      "rest-auth_password_change_create"
    ](passwordsData);
  };

  resetPassword = (emailData) => {
    return window.client.apis["rest-auth"]["rest_auth_password_reset_create"]({
      data: emailData,
    });
  };

  confirmReset = (confirmResetData) => {
    return window.client.apis["rest-auth/password/reset/confirm/"][
      "rest-auth_password_reset_confirm_create"
    ]({ ...confirmResetData });
  };
}
export default new AuthService();
