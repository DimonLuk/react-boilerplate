class UserService {
  getUser = () => {
    return window.client.apis["rest-auth/user/"]["rest-auth_user_read"]();
  };

  updateUserFields = () => {
    return window.client.apis["rest-auth/user/"]["rest-auth_user_update"]({});
  };

  addUserFields = () => {
    return window.client.apis["rest-auth/user/"][
      "rest-auth_user_partial_update"
    ]({});
  };
}
export default new UserService();
