import express from "express";
import { authorizeRole, isAuthenticated } from "../middelware/auth";
import {
  getNotification,
  updateNotification,
} from "../controllers/notification.controller";

const notificationRoute = express.Router();

notificationRoute.get(
  "/notifications",
  isAuthenticated,
  authorizeRole("admin"),
  getNotification
);

notificationRoute.put(
  "/notifcations/:id",
  isAuthenticated,
  authorizeRole("admin"),
  updateNotification
);

export default notificationRoute;
