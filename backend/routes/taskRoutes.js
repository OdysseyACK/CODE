import express from "express";
import Task from "../models/taskModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const taskRouter = express.Router();

// create new task
taskRouter.post("/calendar/:id", isAuth, async (req, res) => {
  try {
    const { name, date, isDone } = req.body;
    const belongsTo = req.params.id; // use params to get event ID
    const task = new Task({
      name,
      date,
      isDone,
      belongsTo,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// fetch all tasks from db into calend that is specific to one event
taskRouter.get("/calendar/:id", isAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ belongsTo: req.params.id });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// fetch all tasks from db into profilepage
taskRouter.get(
  "/profilepage",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchTasks = await Task.find();
      res.json(fetchTasks);
    } catch (error) {
      throw new Error(error);
    }
  })
);

// fetch specific task from db
taskRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  })
);

// delete specific task
taskRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        await task.deleteOne();
        res.send({ message: "Task Removed" });
      } else {
        res.status(404).send({ message: "Task Not Found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error removing task" });
    }
  })
);

taskRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.isDone = Boolean(req.body.isDone);
      const updatedTask = await task.save();
      res.send({ message: "task Updated", task: updatedTask });
    } else {
      res.status(404).send({ message: "Task Not Found" });
    }
  })
);

export default taskRouter;
