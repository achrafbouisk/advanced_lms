import { Response } from "express";
import orderModel from "../models/order.model";

//create new order:
export const createOrderService = async (data: any, res: Response) => {
  const order = await orderModel.create(data);

  res.status(201).json({
    success: true,
    order,
  });
};

//get all orders
export const getAllOrdersService = async (res: Response) => {
  const orders = await orderModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
};
