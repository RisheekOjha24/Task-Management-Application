const User = require("../models/userSchema");
const List = require("../models/listSchema");
const Task = require("../models/taskSchema");


const createList = async (req, res) => {
  try {
    const { useremail, listName } = req.body;

    if (!useremail || !listName) {
      return res
        .status(404)
        .json({ error: "User email and list name are required." });
    }

    let user = await User.findOne({ useremail });

    //checking if list already exists
   const existingList = await List.findOne({
      name: listName,
      userId: user._id,
    });

    if (existingList) {
      return res
        .status(400)
        .json({ error: "List with this name already exists for this user." });
    }

    const newList = new List({ name: listName, userId: user._id });
    await newList.save();
    res.status(201).json({ listId: newList._id });

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the list." });
  }
};
// ===========================================================================
const getAllList = async (req, res) => {
  try {
    const { useremail } = req.query; // Assuming email is passed as a query

    if (!useremail) {
      return res.status(400).json({ error: "User email is required." });
    }

    const user = await User.findOne({ useremail });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find all lists associated with the user
    const lists = await List.find({ userId: user._id }); //return arrays of objetcs
   
    // Format the lists into the desired array of objects
    const listArrObj = lists.map((list) => ({
      name: list.name,
      id: list._id,
    }));

    // Respond with the formatted array of lists
    res.status(200).json(listArrObj);

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the lists." });
  }
};
// ==========================================================================
const deleteList = async (req, res) => {
  try {
    const { useremail, id } = req.query;

    if (!useremail || !id) {
      return res
        .status(400)
        .json({ error: "User email and list ID are required." });
    }

    const user = await User.findOne({ useremail });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the list item by ID, ensuring it belongs to the user
    const result = await List.findOneAndDelete({ _id: id, userId: user._id });

    // Delete all tasks related to the specified listId
    await Task.deleteMany({ listId: id });

    if (!result) {
      return res
        .status(404)
        .json({ error: "List item not found or not authorized." });
    }

    // Send success response
    res.status(200).json({ message: "List item deleted successfully." });
  } catch (error) {
    console.error("Error deleting list item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the list item." });
  }
};


module.exports={createList,getAllList,deleteList};