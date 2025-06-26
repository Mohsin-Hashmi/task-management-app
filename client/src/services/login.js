import axios from "axios";
import { BASE_URL } from "../utils/contanst";
const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response?.data?.user;
  } catch (err) {
    console.error("Error during login: ", err);
  }
};
export default login;
