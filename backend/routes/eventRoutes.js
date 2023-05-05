import express from "express";
import Event from "../models/eventModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const eventRouter = express.Router();

// create new event
eventRouter.post("/", isAuth, async (req, res) => {
  try {
    const { name, type, startDate, startTime } = req.body;
    const createdBy = req.user._id;
    const event = new Event({
      name,
      type,
      startDate,
      startTime,
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

eventRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.send(event);
    } else {
      res.status(404).send({ message: "Event not found" });
    }
  })
);

eventRouter.get("/user/:userId", async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.params.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user events" });
  }
});

eventRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.name = req.body.eventName;
      event.type = req.body.eventType;
      event.startDate = req.body.startDate;
      event.startTime = req.body.startTime;
      const updatedEvent = await event.save();
      res.send({ message: "Event Updated", event: updatedEvent });
    } else {
      res.status(404).send({ message: "Event Not Found" });
    }
  })
);

export default eventRouter;
