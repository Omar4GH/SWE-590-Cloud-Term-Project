import axios from "axios";



let config = {
  baseURL: "http://3.72.8.13:7000/api",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(function (config) {
 
  return config;
});

export default _axios;