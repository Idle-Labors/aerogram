import axios from "axios";

export const user = {
  login(data) {
    return axios.post("/api/login", data);
  },
  signup(data) {
    return axios.post("/api/signup", data);
  },
};
