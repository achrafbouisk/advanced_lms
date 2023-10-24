import express from "express";
import { authorizeRole, isAuthenticated } from "../middelware/auth";
import {
  getCoursesAnalytics,
  getUserAnalytics,
  getordersAnalytics,
} from "../controllers/analytics.controller";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/user-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getUserAnalytics
);

analyticsRouter.get(
  "/course-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getCoursesAnalytics
);
analyticsRouter.get(
  "/order-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getordersAnalytics
);

export default analyticsRouter;
