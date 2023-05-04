import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
