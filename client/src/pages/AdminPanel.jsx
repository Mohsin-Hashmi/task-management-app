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
  const admin = useSelector((store) => store.user);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("taskStore :", tasksStore);

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

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log(response);
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
      <section>
        <h3 className="text-center text-5xl font-bold pt-8">ADMIN DASHBOARD</h3>
        <div className="flex items-start  py-[70px]">
          <div>
            <h2 className="text-center text-3xl text-semiblod">USERS</h2>
            <Link to="" >
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
                  Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
                <hr className="my-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tasks</h3>
                {(() => {
                  const userTasks = tasksStore.filter(
                    (task) => task.user === selectedUser._id
                  );
                  if (userTasks.length === 0) {
                    return <p className="text-gray-400">No tasks for this user.</p>;
                  }
                  return (
                    <ul className="list-disc pl-5 space-y-2">
                      {userTasks.map((task) => (
                        <li key={task._id} className="bg-indigo-50 rounded p-2 mb-1">
                          <span className="font-semibold text-gray-800">{task.title}</span>
                          <span className="ml-2 text-sm text-gray-500">({task.priority})</span>
                          <span className={
                            'ml-2 text-xs px-2 py-1 rounded-full ' +
                            (task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')
                          }>
                            {task.completed ? 'Completed' : 'Pending'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                })()}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
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
