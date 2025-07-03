import Navbar from "../components/Navbar";
import Statistics from "../components/Statistics";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import { addTasks } from "../utils/taskSlice";
import getAllTasks from "../services/getAllTasks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TaskControls from "../components/TaskControls";
import deleteTask from "../services/deleteTask";
import { removeTask } from "../utils/taskSlice";
import Modal from "../components/Modal";
import editTask from "../services/editTask";
import TaskCompletionModal from "../components/TaskCompletionModal";
import toggleCompletion from "../services/toggleCompletion";
import { updateTask } from "../utils/taskSlice";
import { toast } from "react-toastify";
import { useMemo } from "react";

const DashBoard = () => {
  const dispatch = useDispatch();
  const tasksStore = useSelector((store) => store.task);
  const user = useSelector((store) => store.user);
  const userTasks = useMemo(() => {
  return tasksStore.filter((task) => task.user === user._id);
}, [tasksStore, user._id]);
  const userTasksLength = userTasks.length;
  const completedCount = userTasks.filter((task) => task.completed).length;
  const pendingCount = userTasks.filter((task) => !task.completed).length;
  const [showModal, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [modalTask, setModalTask] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setModalTask(null);
    setIsModalOpen(true);
  };

  // Open for edit
  const handleOpenEditModal = (task) => {
    setModalMode("edit");
    setModalTask(task);
    setIsModalOpen(true);
  };
  useEffect(() => {
  console.log("🧠 tasksStore updated", tasksStore);
}, [tasksStore]);

  /**Get All Tasks API Function */
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

  /**Delete API Function */
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      dispatch(removeTask(taskId));
      console.log("deleted succeddfully", response);
    } catch (err) {
      console.log("Error to Delete Tasks: ", err);
    }
  };

  /**Edit API Function */
  const handleEditTask = async (taskId, payload) => {
    try {
      const response = await editTask(taskId, payload);
      return response;
    } catch (err) {
      console.log("Error to Edit Tasks: ", err);
    }
  };

  /**Toogle Completion API Function */

  const toggleTask = async (taskId) => {
  try {
    const updatedTask = await toggleCompletion(taskId);
    if (!updatedTask) {
      toast.error("Something went wrong");
      return;
    }

    dispatch(updateTask(updatedTask)); // ✅ update Redux

    if (updatedTask.completed) {
      toast.success("Task marked as completed!");
    } else {
      toast.info("Task marked as uncompleted.");
    }

    setCompleted(false); // Close modal
  } catch (err) {
    console.error("Error toggling task:", err);
    toast.error("Something went wrong.");
  }
};


  const handleCompleteTask = (task) => {
    setTaskToComplete(task);
    setCompleted(true);
  };

  return (
    <div className="container">
      <Navbar />
      <Statistics
        totalCount={userTasksLength}
        completedCount={completedCount}
        pendingCount={pendingCount}
      />
      <TaskControls showModal={handleOpenCreateModal} />
      <h3 className="text-center text-5xl font-bold pt-8">TASK CARDS</h3>
      <div className="flex flex-wrap gap-1 justify-start items-center py-16 ">
        {userTasks.length > 0 ? (
          userTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              showModal={handleOpenEditModal}
              completed={() => handleCompleteTask(task)}
              showPopUp={(task) => handleCompleteTask(task)}
            />
          ))
        ) : (
          <p>No Task Found</p>
        )}
      </div>
      {showModal && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          editTask={handleEditTask}
          mode={modalMode}
          task={modalTask}
        />
      )}
      {completed && taskToComplete && (
        <TaskCompletionModal
          closeModal={() => setCompleted(false)}
          task={taskToComplete}
          onConfirm={toggleTask}
        />
      )}
    </div>
  );
};

export default DashBoard;
