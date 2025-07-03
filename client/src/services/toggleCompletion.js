import { BASE_URL } from "../utils/contanst";
import axios from "axios";
const toggleCompletion = async (taskId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/toggle/${taskId}`,
      { },
      { withCredentials: true }
    );
    return response?.data?.updatedTask;
  } catch (err) {
    console.log("Error in toggle Completion", err);
  }
};

export default toggleCompletion;
