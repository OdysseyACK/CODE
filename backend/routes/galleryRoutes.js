import express from "express";
import expressAsyncHandler from "express-async-handler";
import Gallery from "../models/galleryModel.js";

const galleryRouter = express.Router();

//create image in profile page tagging the userID
galleryRouter.post(
  "/profilepage/:id",
  expressAsyncHandler(async (req, res) => {
    const newGallery = new Gallery({
      image: req.body.image,
      uploadedBy: req.params.id,
    });
    const gallery = await newGallery.save();
    res.send(gallery);
  })
);

//read image in profile page belonging to the userID
galleryRouter.get(
  "/profilepage/:id",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const images = await Gallery.find({ uploadedBy: userId });
    res.send(images);
  })
);

export default galleryRouter;
