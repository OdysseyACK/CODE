import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin, generateToken } from "../utils.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

// login
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.isActive === true) {
          // check if the user is active
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isVendor: user.isVendor,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        } else {
          res.status(401).send({
            message:
              "Account is disabled. Please contact admin for more information.",
          });
          return;
        }
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// update user profile in accounts
userRouter.put(
  "/account",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.vendorDesc = req.body.vendorDesc || user.vendorDesc;
      user.vendorType = req.body.vendorType || user.vendorType;
      user.vendorPrice = req.body.vendorPrice || user.vendorPrice;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        isAdmin: updatedUser.isAdmin,
        isVendor: updatedUser.isVendor,
        vendorDesc: updatedUser.vendorDesc,
        vendorType: updatedUser.vendorType,
        vendorPrice: updatedUser.vendorPrice,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

// update vendor profile
userRouter.put(
  "/vaccount",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user && user.isVendor) {
      // only allow vendors to update their own accounts
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.vendorDesc = req.body.vendorDesc || user.vendorDesc;
      user.vendorType = req.body.vendorType || user.vendorType;
      user.vendorPrice = req.body.vendorPrice || user.vendorPrice;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        isAdmin: updatedUser.isAdmin,
        isVendor: updatedUser.isVendor, // return the isVendor field in the response
        vendorDesc: updatedUser.vendorDesc,
        vendorType: updatedUser.vendorType,
        vendorPrice: updatedUser.vendorPrice,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

// register
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      isVendor: req.body.isVendor,
      profilePic: req.body.profilePic,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      isVendor: user.isVendor,
      isAdmin: user.isAdmin,

      token: generateToken(user),
    });
  })
);

// fetch all users from db
userRouter.get(
  "/dashboard",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchUsers = await User.find();
      res.json(fetchUsers);
    } catch (error) {
      throw new Error(error);
    }
  })
);

// fetch all users from db that is a vendor
userRouter.get(
  "/vendors",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchUsers = await User.find({ isVendor: true });
      res.json(fetchUsers);
    } catch (error) {
      throw new Error(error);
    }
  })
);

// fetch all users from db that belongs to specific user
userRouter.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // return user data as JSON object
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// update all users from db that belongs to specific user
userRouter.put(
  "/dashboard",
  isAdmin,
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isAdmin = true;
      const updatedUser = await user.save();
      res.send({
        user: updatedUser,
        token: generatedToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// get specific user
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      console.log("User data from server:", user); // Log the user data on the server-side
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

// dashboard edit user
userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isAdmin = Boolean(req.body.isAdmin);
      user.isVendor = Boolean(req.body.isVendor);
      user.isActive = Boolean(req.body.isActive);
      const updatedUser = await user.save();
      res.send({ message: "user Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// delete user
userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        await user.deleteOne();
        res.send({ message: "User Deleted" });
      } else {
        res.status(404).send({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error deleting user" });
    }
  })
);

// fetch only vendors from db
userRouter.get(
  "/vcalculator",
  expressAsyncHandler(async (req, res) => {
    try {
      const fetchVendors = await User.find({ isVendor: true });
      res.json(fetchVendors);
    } catch (error) {
      throw new Error(error);
    }
  })
);

export default userRouter;
