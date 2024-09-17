const mongoose = require("mongoose");
const { Schema } = mongoose;

const List = require("./listSchema");

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String },
  status: { type: String },
  listId: { type: Schema.Types.ObjectId, ref: "List", required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports=Task;