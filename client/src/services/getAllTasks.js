import axios from "axios";
import { BASE_URL } from "../utils/contanst";

const getAllTasks = async () => {
 
  try {
    const response = await axios.get(`${BASE_URL}/tasks`, {withCredentials:true});
    return response?.data?.tasks;
  } catch (err) {
    console.log("Error in fetching tasks", err);
  }
};
export default getAllTasks;
