import router from "./index";
import axios from "axios";

export const user = {
  checkValidation(isValid) {
    return axios.post("/api/login", isValid);
  },
  signupCheck(isValid) {
    return axios.post("/api/signup", isValid);
  },
};
