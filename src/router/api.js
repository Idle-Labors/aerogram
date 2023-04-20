import axios from "axios";

export const user = {
  login(data) {
    return axios.post("http://localhost:3000/login", data);
  },
  signup(data) {
    return axios.post("http://localhost:3000/signup", data);
  },
};
