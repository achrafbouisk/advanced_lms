import express from "express";
import { authorizeRole, isAuthenticated } from "../middelware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/orders", isAuthenticated, createOrder);
orderRouter.get(
  "/orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrders
);

export default orderRouter;
