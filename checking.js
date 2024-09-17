const task = {
  title: "Complete project",
  description: "Finish the project by the deadline",
  dueDate: new Date(),
  priority: "high",
  status: "pending",
  __v: 0, // Mongoose's internal version key, which we want to remove
};

const { __v, ...taskWithoutVersion } = task;
console.log(taskWithoutVersion);