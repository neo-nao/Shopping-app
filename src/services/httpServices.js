import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_DEV ?? ""
  
const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};

export default http;
