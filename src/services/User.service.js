import client from "Api.service";
class UserService {
  constructor() {}

  getUser = () => {
    client["rest-auth/user/"]["rest-auth_user_read"]();
  };

  updateUserFields = () => {
    client["rest-auth/user/"]["rest-auth_user_update"]({});
  };

  addUserFields = () => {
    client["rest-auth/user/"]["rest-auth_user_partial_update"]({});
  };
}
export default new UserService();
