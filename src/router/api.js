import axios from "axios";

export const user = {
  login(data) {
    return axios.post("http://localhost:3000/api/login", data);
  },
  signup(data) {
    return axios.post("http://localhost:3000/signup", data);
  },
};
