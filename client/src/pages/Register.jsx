import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  return (
    <div className="container">
      <h1 className="text-center text-5xl pt-10 pb-6 font-semibold">
        Student Task Manager
      </h1>

      <div className=" w-[500px] m-auto p-6  rounded-2xl bg-[#BDE037] shadow-lg">
        <h2 className="text-center text-2xl pb-6 font-semibold">
          Create An Account
        </h2>
        <form action="">
          <input
            className="w-full p-4 rounded-lg outline-none text-[#232323]"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-lg outline-none mt-6 text-[#232323]"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-lg outline-none mt-6 text-[#232323]"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            
          />
          <button
            className="m-auto bg-[#5937E0] block p-3 w-[150px] mt-8 rounded-lg"
            type="submit"
          >
            Register
          </button>
          <div className="flex justify-center gap-x-3 items-center mt-6">
            <p>Already have an account?</p> <Link to=''>Login</Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
