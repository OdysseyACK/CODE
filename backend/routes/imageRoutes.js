import express from "express";
import Image from "../models/imageModel.js";

const imageRouter = express.Router();

imageRouter.post("/uploadimage", async (req, res) => {
  const { base64 } = req.body;
  try {
    images.create({ image: base64 });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

export default imageRouter;
