import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_DEV ?? "http://app-46647a95-a0f0-4902-b8cc-2406d764bedc.cleverapps.io"
  
const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};

export default http;
