import { NextFunction } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncError";
import OrderModel from "../models/order.model";

// create course
export const newOrder = CatchAsyncError(
  async (data: any, next: NextFunction) => {
    const order = await OrderModel.create(data);
    next(order);
  }
);
