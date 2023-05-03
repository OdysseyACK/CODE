import express from "express";
import User from "../models/userModel.js";
import data from "../data.js";
import Event from "../models/eventModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  await Event.deleteMany({});
  const createdEvents = await Event.insertMany(data.events);

  res.send({ createdUsers, createdEvents });
});

export default seedRouter;
