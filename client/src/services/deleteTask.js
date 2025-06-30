
import axios from "axios";
import { BASE_URL } from "../utils/contanst";
const deleteTask =async (taskId)=>{
    try{
        const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`, {withCredentials: true})
        return response?.data?.deleteTask;
    }catch(err){
        console.log("Error to Delete Task", err)
    }
}
export default deleteTask;