import axios from "axios";

// Components
import { API_URL, REQUEST_TIMEOUT } from "../constants/api";

const login = async (username, password) => {
    const response = await axios({
      method: "post",
      url: `${API_URL}/login`,
      params: {
        "username": username,
        "password": password,
      },
      timeout: REQUEST_TIMEOUT
    });
    if (response.data.token) {
        localStorage.setItem("auth", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("statistic");
};

export default {
  login,
  logout,
};