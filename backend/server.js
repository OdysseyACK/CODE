import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import eventRouter from "./routes/eventRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import agendaRouter from "./routes/agendaRoutes.js";
import galleryRouter from "./routes/galleryRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/agenda", agendaRouter);
app.use("/api/gallery", galleryRouter);

const __dirname = path.resolve(); // returns current directory
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// app.post("/users/:id/photo", upload.single("photo"), async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return res.status(404).send({ error: "User not found" });
//   }
//   user.photo = req.file.buffer;
//   await user.save();

//   res.send(user);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

// // Route to get user profile photo
// app.get("/profile-photo/:userId", (req, res) => {
//   // Get user's profile photo from the database
//   const userId = req.params.userId;
//   const user = getUser(userId);
//   const profilePhoto = user.profilePhoto;

//   // Send profile photo as response
//   res.sendFile(profilePhoto);
// });
