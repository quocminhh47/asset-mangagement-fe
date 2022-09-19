import {AXIOS_API_URL} from "../constants/Axios";
import axios from "axios";

class LoginService {
  login(username, password) {
    const url = AXIOS_API_URL + "/user/api/auth/signin";
    console.log(url);
    return axios.post(url, { username: username, password: password });
  }
  changePasswordFirstLogin(username, newPassword) {
    const url = AXIOS_API_URL + "/users/api/first-login";
    console.log(url);
    return axios.post(
      url,
      { userName: username, newPassword: newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  }
}

export default  new LoginService()