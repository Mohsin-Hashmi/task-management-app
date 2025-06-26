import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../services/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlics";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log("response", response);
      dispatch(addUser(response));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.error("Error during login: ", err);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center text-5xl pt-10 pb-6 font-semibold">
        Student Task Manager
      </h1>

      <div className=" w-[500px] m-auto p-6  rounded-2xl bg-[#BDE037] shadow-lg">
        <h2 className="text-center text-2xl pb-6 font-semibold">
          Login to Your Account
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            className="w-full p-4 rounded-lg outline-none mt-6 text-[#232323]"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-lg outline-none mt-6 text-[#232323]"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className={`toggle-switch ${showPassword ? "on" : ""}`}
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ marginTop: "10px" }}
          >
            <div className="toggle-knob"></div>
          </div>
          <button
            className="m-auto bg-[#5937E0] block p-3 w-[150px] mt-8 rounded-lg"
            type="submit"
          >
            Login
          </button>
          <div className="flex justify-center gap-x-3 items-center mt-6">
            <p>Don't have an account?</p> <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
