import express from "express";
import Event from "../models/eventModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const eventRouter = express.Router();

// create new event
eventRouter.post("/", isAuth, async (req, res) => {
  try {
    const { name, type, startDate, endDate, startTime, endTime } = req.body;
    const createdBy = req.user._id;
    const event = new Event({
      name,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      createdBy,
    });
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// fetch events from db into calendar
eventRouter.get(
  "/calendar",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchEvents = await Event.find();
      res.json(fetchEvents);
    } catch (error) {
      throw new Error(error);
    }
  })
);

// fetch events from db into itinerary
eventRouter.get(
  "/itinerary",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchEvents = await Event.find();
      res.json(fetchEvents);
    } catch (error) {
      throw new Error(error);
    }
  })
);

export default eventRouter;
