import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Birthday", "Corporate", "Party", "Wedding", "Others"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventTasks: {
    type: [String],
    required: false,
  },
  agenda: {
    type: [String],
    required: false,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
