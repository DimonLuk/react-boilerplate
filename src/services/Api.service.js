import Swagger from "swagger-client";

class ApiService {
  init() {
    return Swagger(process.env.REACT_APP_SWAGGER_URL, {
      authorizations: {
        Bearer: localStorage.DEEMA_TOKEN
          ? `Bearer ${localStorage.DEEMA_TOKEN}`
          : undefined,
      },
    }).then((value) => {
      window.client = value;
    });
  }
}

export default ApiService;
