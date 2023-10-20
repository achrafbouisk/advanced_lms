import express from "express";
import { isAuthenticated } from "../middelware/auth";
import { createOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);

export default orderRouter;