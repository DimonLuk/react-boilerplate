import Swagger from "swagger-client";

const init = async () => {
  return await Swagger(process.env.REACT_APP_SWAGGER_URL).apis;
};
export default init();
