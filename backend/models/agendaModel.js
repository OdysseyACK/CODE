import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
  },
  belongsTo: {
    type: String,
    required: true,
  },
});

const Agenda = mongoose.model("Agenda", agendaSchema);

export default Agenda;
