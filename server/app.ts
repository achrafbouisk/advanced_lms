import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middelware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
require("dotenv").config();

export const app = express();

// Cors, BodyParser, CookieParser
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: process.env.ORIGINS,
  })
);
app.use(cookieParser());

// APIs
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);

// Testing API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Unknown APIs
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`URL: ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
