import axios from "axios";
import { BASE_URL } from "../utils/contanst";
const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      { email, name, password },
      { withCredentials: true }
    );
    return response?.data?.user;
  } catch (err) {
    console.error("Error during registration: ", err);
  }
};

export default register;

