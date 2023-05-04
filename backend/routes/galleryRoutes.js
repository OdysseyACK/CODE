import express from "express";
import expressAsyncHandler from "express-async-handler";
import Gallery from "../models/galleryModel.js";

const galleryRouter = express.Router();

galleryRouter.post(
  "/profilepage/:id",
  expressAsyncHandler(async (req, res) => {
    const newGallery = new Gallery({
      name: req.body.name,
      image: req.body.image,
      uploadedBy: req.params.id,
    });
    const gallery = await newGallery.save();
    res.send(gallery);
  })
);

galleryRouter.get(
  "/profilepage/:id",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const images = await Gallery.find({ uploadedBy: userId });
    res.send(images);
  })
);

export default galleryRouter;
