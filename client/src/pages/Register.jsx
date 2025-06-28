import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import register from "../services/register";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlics";
import UserForm from "../components/UserForm";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  /**API Handler Function */
  const handleRegister = async ({name, email, password}) => {
    
    try {
      const response = await register({ name, email, password });
      dispatch(addUser(response));
      navigate("/login");
    } catch (err) {
      console.error("Error during registration: ", err);
    }
  };
  return  <UserForm mode= "register" onSubmit={handleRegister}/>
};

export default Register;
