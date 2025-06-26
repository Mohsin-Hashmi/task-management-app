import React from "react";
import Navbar from "../components/Navbar";
import Statistics from "../components/Statistics";
import TaskCard from "../components/TaskCard";
import { useEffect } from "react";
import { addTasks } from "../utils/taskSlice";
import getAllTasks from "../services/getAllTasks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const DashBoard = () => {
  const dispatch = useDispatch();
  const tasksStore = useSelector((store) => store.task);
  const user = useSelector((store) => store.user);

  const userTasks = tasksStore.filter((task) => task.user === user._id);
  console.log("user task is ", userTasks);
  const handleGetTasks = async () => {
    try {
      const response = await getAllTasks();
      dispatch(addTasks(response));
    } catch (err) {
      console.log("Error to fetch Tasks: ", err);
    }
  };
  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Statistics />
      <h3 className="text-center text-5xl font-bold pt-8">TASK CARDS</h3>
      <div className="flex flex-wrap gap-7 justify-center items-center py-16">
        {userTasks.length > 0 ? (
        userTasks.map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p>No Task Found</p>
      )}
      </div>
      
    </div>
  );
};

export default DashBoard;
