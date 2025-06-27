import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import register from "../services/register";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlics";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /**API Handler Function */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ name, email, password });
      dispatch(addUser(response));
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.error("Error during registration: ", err);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center text-5xl pt-10 pb-6 font-semibold">
        Student Task Manager
      </h1>

      <div className=" w-[500px] m-auto p-5  rounded-2xl bg-[#FFF] shadow-lg">
        <h2 className="text-center text-2xl pb-6 font-semibold text-[#232323]">
          Create An Account
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            className="w-full p-3 rounded-lg outline-none text-[#232323] border-2 border-[#232323]"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded-lg outline-none mt-6 text-[#232323] border-2 border-[#232323]"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 rounded-lg outline-none mt-6 text-[#232323] border-2 border-[#232323]"
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
            Register
          </button>
          <div className="flex justify-center gap-x-3 items-center mt-6">
            <p className="text-[#232323]">Already have an account?</p> <Link className="text-blue-500" to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
