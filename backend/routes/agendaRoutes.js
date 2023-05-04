import express from "express";
import Agenda from "../models/agendaModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const agendaRouter = express.Router();

// create new agenda
agendaRouter.post("/itinerary/:id", isAuth, async (req, res) => {
  try {
    const { name, date, startTime } = req.body;
    const belongsTo = req.params.id;
    const agenda = new Agenda({
      name,
      date,
      startTime,
      belongsTo,
    });
    const newAgenda = await agenda.save();
    res.status(201).json(newAgenda);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// fetch all agenda from db into calend that is specific to one event
agendaRouter.get("/itinerary/:id", async (req, res) => {
  try {
    const agenda = await Agenda.find({ belongsTo: req.params.id });
    res.json(agenda);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// fetch all agenda from db into profilepage
agendaRouter.get(
  "/profilepage",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchAgenda = await Agenda.find();
      res.json(fetchAgenda);
    } catch (error) {
      throw new Error(error);
    }
  })
);

// fetch specific agenda from db
agendaRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const agenda = await Agenda.findById(req.params.id);
    if (agenda) {
      res.send(agenda);
    } else {
      res.status(404).send({ message: "Agenda not found" });
    }
  })
);

// delete specific agenda
agendaRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const agenda = await Agenda.findById(req.params.id);
      if (agenda) {
        await agenda.deleteOne();
        res.send({ message: "Agenda Removed" });
      } else {
        res.status(404).send({ message: "Agenda Not Found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error removing task" });
    }
  })
);

export default agendaRouter;
