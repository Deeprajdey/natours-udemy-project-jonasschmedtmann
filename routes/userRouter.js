const express = require("express");
const {
  getAllUserData,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/userController");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  logout,
} = require("./../controllers/authController");

//ROUTERS
const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.get("/logout", logout);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);

userRouter.use(protect);

userRouter.get("/me", getMe, getUserById);
userRouter.patch("/updateMyPassword", updatePassword);
userRouter.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
userRouter.delete("/deleteMe", deleteMe);

userRouter.use(restrictTo("admin"));

userRouter.route("/").get(getAllUserData).post(createUser);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);
module.exports = userRouter;
