import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import getAllTasks from "../services/getAllTasks";
import { addTasks } from "../utils/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import getAllUsers from "../services/getAllUsers";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks]= useState([]);
  const [users, setUsers]= useState([]);
  // const handleGetTasks = async () => {
  //   try {
  //     const response = await getAllTasks();
  //     setTasks(response);
  //     dispatch(addTasks(response));
  //   } catch (err) {
  //     console.log("Error to fetch Tasks: ", err);
  //   }
  // };
  // useEffect(() => {
  //   handleGetTasks();
  // }, []);


  const handleGetAllUsers = async ()=>{
    try{
      const response = await getAllUsers();
      console.log(response)
      setUsers(response)
    }catch(err){
      console.log("Error to fetch Users: ", err);
    }
  }

  useEffect(()=>{
    handleGetAllUsers()
  }, [])

 
  return (
     <div className="container">
      <Navbar />
      <section >
        <h3 className="text-center text-5xl font-bold pt-8">ADMIN DASHBOARD</h3>
        {
          users && users.length > 0 ? (
            users.map((user)=>{
              return (
                <div key={user._id}>
                  {user.name}  ({user.email})
                  <h3>Tasks : <p></p></h3>
                </div>
              )
            })
          ):(
            <p>No Task Found !</p>
          )
        }
      </section>
     </div>
      
    
  );
};

export default AdminPanel;
