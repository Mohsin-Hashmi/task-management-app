import { BASE_URL } from "../utils/contanst";
import axios from "axios";
const editTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/${taskId}`,
      updatedTask,
      { withCredentials: true }
    );
    return response?.data?.updatedTask;
  } catch (err) {
    console.log("Error to edit task", err);
  }
};

export default editTask;
