import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import getAllTasks from "../services/getAllTasks";
import { addTasks } from "../utils/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import getAllUsers from "../services/getAllUsers";
import { Link } from "react-router-dom";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const tasksStore = useSelector((store) => store.task);
  const [selectedUser, setSelectedUser] = useState(null);
  const totalUsers = users.length;
  const totalTasks = tasks.length;
  const completedTasks = tasksStore.filter((task) => task.completed).length;
  const pendingTasks = tasksStore.filter((task) => !task.completed).length;

  /**API to get All the Tasks */
  const handleGetTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response);
      dispatch(addTasks(response));
    } catch (err) {
      console.log("Error to fetch Tasks: ", err);
    }
  };
  useEffect(() => {
    handleGetTasks();
  }, []);

    /**API to get All the Users */
  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log("response is: ",response);
      setUsers(response.filter((user) => !user.isAdmin));
    } catch (err) {
      console.log("Error to fetch Users: ", err);
    }
  };
  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <section className="my-12">
        <div className="flex justify-around items-center gap-6">
          <div className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col items-center w-56 hover:shadow-xl transition">
            <span className="bg-indigo-100 text-indigo-700 rounded-full p-3 mb-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-3xl font-bold text-indigo-700 mt-1">
              {totalUsers}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col items-center w-56 hover:shadow-xl transition">
            <span className="bg-blue-100 text-blue-700 rounded-full p-3 mb-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 17v-6h13v6M9 17H5a2 2 0 01-2-2v-6a2 2 0 012-2h4m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-gray-700">Total Tasks</h2>
            <p className="text-3xl font-bold text-blue-700 mt-1">
              {totalTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col items-center w-56 hover:shadow-xl transition">
            <span className="bg-green-100 text-green-700 rounded-full p-3 mb-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
            <p className="text-3xl font-bold text-green-700 mt-1">
              {completedTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md px-8 py-6 flex flex-col items-center w-56 hover:shadow-xl transition">
            <span className="bg-yellow-100 text-yellow-700 rounded-full p-3 mb-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
            <p className="text-3xl font-bold text-yellow-700 mt-1">
              {pendingTasks}
            </p>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-center text-5xl font-bold pt-8">ADMIN DASHBOARD</h3>
        <div className="flex items-start  py-[70px]">
          <div>
            <h2 className="text-center text-3xl text-semiblod">USERS</h2>
            <Link to="">
              {users && users.length > 0 ? (
                users.map((user) => {
                  // For each user, get their tasks from the tasksStore
                  const userTasks = tasksStore.filter(
                    (task) => task.user === user._id
                  );
                  const userTasksLength = userTasks.length;
                  const completedTask = userTasks.filter(
                    (task) => task.completed
                  ).length;
                  return (
                    <div
                      key={user._id}
                      onClick={() => setSelectedUser(user)}
                      className="bg-white rounded-xl shadow-lg p-4 m-4 w-[570px]  min-h-50 transition-transform hover:scale-105 hover:shadow-2xl "
                    >
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 text-indigo-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {user.name}
                          </h2>
                          <p className="text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 mb-2">
                        <div className="bg-indigo-50 rounded-lg px-4 py-2 text-center flex-1">
                          <p className="text-sm text-gray-500">Total Tasks</p>
                          <p className="text-indigo-700 font-bold text-lg">
                            {userTasksLength}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg px-4 py-2 text-center flex-1">
                          <p className="text-sm text-gray-500">Completed</p>
                          <p className="text-green-600 font-bold text-lg">
                            {completedTask}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                          Joined:{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                          User
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No Task Found !</p>
              )}
            </Link>
          </div>
          <div>
            <h2 className="text-center text-3xl text-semiblod">Tasks</h2>
            {selectedUser ? (
              <div className="bg-white rounded-xl shadow-lg p-6 m-4 h-full w-[500px]">
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                  {selectedUser.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  Email: {selectedUser.email}
                </p>
                <p className="text-gray-600 mb-1">
                  Joined:{" "}
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
                <hr className="my-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Tasks
                </h3>
                {(() => {
                  const userTasks = tasksStore.filter(
                    (task) => task.user === selectedUser._id
                  );
                  if (userTasks.length === 0) {
                    return (
                      <p className="text-gray-400">No tasks for this user.</p>
                    );
                  }
                  return (
                    <ul className="list-disc pl-5 space-y-2">
                      {userTasks.map((task) => (
                        <li
                          key={task._id}
                          className="bg-indigo-50 rounded p-2 mb-1"
                        >
                          <span className="font-semibold text-gray-800">
                            {task.title}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({task.priority})
                          </span>
                          <span
                            className={
                              "ml-2 text-xs px-2 py-1 rounded-full " +
                              (task.completed
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700")
                            }
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                })()}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 m-4">
                <span>Select a user to view their tasks</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
