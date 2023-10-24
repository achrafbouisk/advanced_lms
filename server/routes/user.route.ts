import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  register,
  socialAuth,
  upadteProfilePicture,
  updateAccessToken,
  updatePassword,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRole, isAuthenticated } from "../middelware/auth";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh-token", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.get("/users", isAuthenticated, authorizeRole("admin"), getAllUsers);
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRole("admin"),
  updateUserRole
);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/users", isAuthenticated, updateUserInfo);
userRouter.put("/update-password", isAuthenticated, updatePassword);
userRouter.put("/update-avatar", isAuthenticated, upadteProfilePicture);
userRouter.delete(
  "/users/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteUser
);

export default userRouter;
