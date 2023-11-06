import axios from "axios";

// Components
import { API_URL } from "../constants/api";

const statistic = async (token) => {
    const response = await axios({
        method: "get",
        url: `${API_URL}/statistic`,
        headers: {
          "Authorization": `Bearer ${token}`
        },
        timeout: 3000
      });
    if (response.data) {
        localStorage.setItem("statistic", JSON.stringify(response.data));
    }
    return response.data;
};

export default {
  statistic,
};