
import login from "../services/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlics";
import UserForm from "../components/UserForm";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({email, password}) => {
  
    try {
      const response = await login({ email, password });
      console.log("response", response);
      dispatch(addUser(response));
      navigate("/");
    } catch (err) {
      console.error("Error during login: ", err);
    }
  };
  return <UserForm mode="login" onSubmit={handleLogin} />
};

export default Login;
