const User = require("../models/userSchema");
const List = require("../models/listSchema");
const Task = require("../models/taskSchema");

// ==================Create Task API================================
const createTask = async (req, res) => {
  try {
    // Extract data from request body
    const { description, dueDate, priority, status, title, listId, useremail,taskId } =
      req.body;

    if (
      !description ||
      !dueDate ||
      !priority ||
      !status ||
      !title ||
      !listId ||
      !useremail
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const user = await User.findOne({ useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = await List.findById(listId);

   if (taskId) {
   
     const task = await Task.findById(taskId);
     if (!task) {
       return res.status(404).json({ message: "Task not found" });
     }

      // Update the task fields
     task.title = title;
     task.description = description;
     task.dueDate = dueDate;
     task.priority = priority;
     task.status = status;
     await task.save();

     return res.status(200).json(task);
   } else {
     // Create a new task
     const newTask = new Task({
       title,
       description,
       dueDate,
       priority,
       status,
       listId,
     });

     await newTask.save();

     return res.status(201).json(newTask);
   }

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===================== Show All Tasks API ============================

const getAllTask = async (req, res) => {
  try {

    const { listId, useremail } = req.query;
     if (!listId || !useremail) {
      return res
        .status(400)
        .json({ message: "listId and useremail are required" });
    }

    // Find the user
    const user = await User.findOne({ useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list
    const list = await List.findOne({ _id: listId, userId: user._id });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    //Finding Tasks
    const tasks = await Task.find({ listId });

    // Format dates to YYYY-MM-DD
    const formattedTasks = tasks.map((task) => ({
      ...task._doc,
      dueDate: task.dueDate.toISOString().split("T")[0], // Convert date to YYYY-MM-DD format
    }));
    // Send response
    res.status(200).json(formattedTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================== Delete Tasks API ==============================

const deleteTask = async (req, res) => {
  try {
    // Extract taskId and listId from query parameters
    const { taskId, listId } = req.query;

    // Validate the parameters
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    if (!listId) {
      return res.status(400).json({ message: "List ID is required" });
    }

    // Find and delete the task by both taskId and listId
    const result = await Task.findOneAndDelete({ _id: taskId, listId: listId });

    // Check if the task was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Task not found or does not belong to the specified list" });
    }

    // Send a success response
    res.status(200).json({ message: "Task deleted successfully", result });

  } catch (error) {
    // Handle any errors that occurred during the operation
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports={createTask,getAllTask,deleteTask}