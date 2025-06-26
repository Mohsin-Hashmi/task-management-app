import axios from "axios";
import { BASE_URL } from "../utils/contanst";
const logout = async ()=>{
    try{
        const response = await axios.post(`${BASE_URL}/auth/logout`, {
            withCredentials: true,
        });
        return response.data;
    }catch(err){
        console.error("Logout failed:", err);
    }
}

export default logout;