import axios from "axios";



let config = {
  baseURL: "http:/LoadBalSwe590-1661466505.eu-central-1.elb.amazonaws.com/api",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(function (config) {
 
  return config;
});

export default _axios;