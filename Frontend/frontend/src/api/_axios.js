import axios from "axios";



let config = {
  baseURL: "http://172.31.22.15:7000/api",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(function (config) {
 
  return config;
});

export default _axios;