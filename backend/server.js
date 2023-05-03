import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import multer from "multer";
import path from "path";
import eventRouter from "./routes/eventRoutes.js";

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

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
