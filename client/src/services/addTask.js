
import axios from 'axios'
import {BASE_URL} from "../utils/contanst"
const addTask = async ({title, description, priority})=>{
    try{
        const response = await axios.post(`${BASE_URL}/tasks`, {title, description, priority}, {withCredentials: true});
        if(!response){
            throw new Error("Error in add the task")
        }
        return response?.data?.newTask;
    }catch(err){
        console.log("Error to add the task ", err);
    }
}
export default addTask;