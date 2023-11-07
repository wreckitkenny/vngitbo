import axios from "axios";

// Components
import { API_URL } from "../constants/api";

const login = async (username, password) => {
    const response = await axios.post(
        `${API_URL}/login`, {
          "username": username,
          "password": password,
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