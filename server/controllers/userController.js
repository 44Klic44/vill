import asyncHandler from "express-async-handler";
import Notice from "../models/notis.js";
import User from "../models/user.js";
import { createJWT } from "../utils/index.js";
import jwt from "jsonwebtoken";

// POST request - login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ status: false, message: "Invalid email or password." });
  }

  if (!user?.isActive) {
    return res.status(401).json({
      status: false,
      message: "User account has been deactivated, contact the administrator",
    });
  }

  const isMatch = await user.matchPassword(password);

  if (user && isMatch) {

    createJWT(res, user._id);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Удаляем пароль из объекта пользователя перед отправкой
    user.password = undefined;

    // Отправляем один ответ с пользователем и токеном
    res.status(200).json({ user, token });
  } else {
    return res.status(401).json({ status: false, message: "Invalid email or password" });
  }
});
// POST - Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, role, title } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res
      .status(400)
      .json({ status: false, message: "Email address already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
    role,
    title,
  });

  if (user) {
    isAdmin ? createJWT(res, user._id) : null;

    user.password = undefined;

    res.status(201).json(user);
  } else {
    return res
      .status(400)
      .json({ status: false, message: "Invalid user data" });
  }
});

// POST -  Logout user / clear cookie
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};



const getTeamList = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
    query = { ...query, ...searchQuery };
  }

  const user = await User.find(query).select("name title role email isActive");

  res.status(201).json(user);
});

// @GET  - get user notifications
 const getNotificationsList = asyncHandler(async (req, res) => {
  try {
    console.log('🔍 req.user.userId =', req.user.userId);
    console.log('🔍 Тип req.user.userId:', typeof req.user.userId);

    const notices = await Notice.find({ team: req.user.userId })
      .populate('task', 'title')
      .sort({ createdAt: -1 });

    console.log('📦 Найдено уведомлений:', notices.length);
    if (notices.length === 0) {
      const noticesAsString = await Notice.find({ team: req.user.userId.toString() });
    }

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getUserTaskStatus = asyncHandler(async (req, res) => {
  const tasks = await User.find()
    .populate("tasks", "title stage")
    .sort({ _id: -1 });

  res.status(200).json(tasks);
});

// @GET  - get user notifications
const markNotificationRead = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    }
    res.status(201).json({ status: true, message: "Done" });
  } catch (error) {
    console.log(error);
  }
});

// PUT - Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {

  const { userId, isAdmin } = req.user;
  const { _id } = req.body;

  const id =
    isAdmin && userId === _id
      ? userId
      : isAdmin && userId !== _id
      ? _id
      : userId;

const user = await User.findById(req.user.userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.title = req.body.title || user.title;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    user.password = undefined;

    res.status(201).json({
      status: true,
      message: "Profile Updated Successfully.",
      user: updatedUser,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

// PUT - active/disactivate user profile
 const activateUserProfile = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    user.isActive = req.body.isActive;

    await user.save();

    user.password = undefined;

    res.status(201).json({
      status: true,
      message: `User account has been ${
        user?.isActive ? "activated" : "disabled"
      }`,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

const changeUserPassword = asyncHandler(async (req, res) => {


  const { oldPassword, password } = req.body;

  if (!oldPassword || !password) {
    return res.status(400).json({
      status: false,
      message: "Old password and new password are required",
    });
  }

  const user = await User.findById(req.user.userId); // ✅ ВАЖНО

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    return res.status(400).json({
      status: false,
      message: "Old password is incorrect",
    });
  }

  user.password = password; 

  await user.save();

  res.status(200).json({
    status: true,
    message: "Password changed successfully",
  });
});

// DELETE - delete user account
const deleteUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).json({ status: true, message: "User deleted successfully" });
});

export {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationsList,
  getTeamList,
  getUserTaskStatus,
  loginUser,
  logoutUser,
  markNotificationRead,
  registerUser,
  updateUserProfile,
};
