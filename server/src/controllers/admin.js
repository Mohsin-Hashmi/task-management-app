const User = require("../models/users");
const Task = require("../models/tasks");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: allUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const getUserTasks = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const userTasks = await Task.find({ user: _id });
    if (!userTasks || userTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User tasks fetched successfully",
      tasks: userTasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const  platformStats = async(req,res)=>{
    try{
        const allUsers=  await User.find();
        if(!allUsers || allUsers.length === 0){
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }
        const validUsers = allUsers.filter(user => user.isAdmin === false);
        const totalUsers = validUsers.length;
        const totalTasks = await Task.countDocuments();     
        const completedTasks = await Task.countDocuments({ completed: true });
        const pendingTasks = await Task.countDocuments({ completed: false });   
        return res.status(200).json({
            success: true,
            message: "Users stats fetched successfully",
            totalUsers,
            totalTasks,
            completedTasks,
            pendingTasks
        });
    }catch(err){
        return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    }
}
module.exports=  {getAllUsers, getUserTasks, platformStats};
