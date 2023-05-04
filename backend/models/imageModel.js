import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    image: String,
  },
  {
    collection: "Images",
  }
);

const Image = mongoose.model("Images", ImageSchema);

export default Image;
