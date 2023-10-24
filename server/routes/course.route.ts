import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middelware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/courses",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);

courseRouter.put(
  "/courses/:id",
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);

courseRouter.get("/courses/:id", getSingleCourse);
courseRouter.get("/courses", getAllCourses);
courseRouter.get("/all-courses", getAllCoursesAdmin);
courseRouter.get("/course-content/:id", isAuthenticated, getCourseByUser);

courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRole("admin"),
  addReplyReview
);

courseRouter.delete(
  "/courses/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteCourse
);

export default courseRouter;
