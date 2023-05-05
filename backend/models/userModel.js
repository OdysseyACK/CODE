import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVendor: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    profilePic: { type: String, required: false },
    vendorDesc: { type: String, required: false },
    vendorType: {
      type: String,
      enum: [
        "Artiste",
        "Catering",
        "Decor",
        "Florist",
        "Photography",
        "Organiser",
        "Venue",
        "Others",
      ],
      required: false,
    },
    vendorPrice: { type: Number, required: false },
    resetToken: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
