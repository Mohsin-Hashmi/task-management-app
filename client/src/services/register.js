import axios from "axios";
import { BASE_URL } from "../utils/contanst";
const register = async ({ name, email, password, isAdmin }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      { email, name, password, isAdmin },
      { withCredentials: true }
    );
    if(!response.ok){
        throw new Error("Network response was not ok");
    }
    return response.user;
  } catch (err) {
    console.error("Error during registration: ", err);
  }
};

export default register;
