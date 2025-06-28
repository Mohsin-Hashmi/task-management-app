import axios from "axios";
import { BASE_URL } from "../utils/contanst";
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`, {
      withCredentials: true,
    });
    if (!response) {
      throw new Error("Error in fetching User Response");
    }
    return response?.data?.users;
  } catch (err) {
    console.log("Error in fetching Users", err);
  }
};

export default getAllUsers;
