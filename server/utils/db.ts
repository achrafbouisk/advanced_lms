import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URL || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`MongoDB connected`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
