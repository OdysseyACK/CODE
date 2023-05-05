import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
