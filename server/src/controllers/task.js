const Task = require("../models/tasks");

/**Get All Tasks */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.lenght === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**Create Task API */
const createTask = async (req, res) => {
  try {
    const { title, description, priority, completed } = req.body;
    if (!title || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const newTask = new Task({
      title,
      description,
      priority,
      completed: completed || false,
      user: req.user._id,
    });

    await newTask.save();
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      user: req.user._id,
      newTask: newTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**Updated Task API */
const updateTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, priority, completed } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        priority,
        completed: completed || false,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updatedTask: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**Deleted Task API */
const deleteTask = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({
        seccess: false,
        message: "Task ID is required",
      });
    }
    const deletedTask = await Task.findByIdAndDelete(_id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or already deleted",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deleteTask: deletedTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const toggleCompletion = async (req, res) => {
  console.log("Toggle completion API hit"); 
  try {

    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 🔁 Toggle the 'completed' status
    task.completed = !task.completed;
 
    await task.save();

    

    return res.status(200).json({
      success: true,
      message: "Task status toggled",
      updatedTask: task,
    });
  } catch (err) {
    console.error("Error in toggleCompletion:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleCompletion,
};
