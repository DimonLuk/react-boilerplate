import Swagger from "swagger-client";

class ApiService {
  init() {
    return Swagger(process.env.REACT_APP_SWAGGER_URL, {
      authorizations: {
        Bearer: localStorage.RT_TOKEN
          ? `Bearer ${localStorage.RT_TOKEN}`
          : undefined,
      },
    }).then((value) => {
      window.client = value;
    });
  }
}

export default ApiService;
