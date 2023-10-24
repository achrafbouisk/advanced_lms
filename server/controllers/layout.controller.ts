import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middelware/catchAsyncError";
import layoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

// Create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} alredy exist`, 500));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner",
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await layoutModel.create(banner);
      } else if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        const faqLayout = {
          type: "FAQ",
          faq: faqItems,
        };

        await layoutModel.create(faqLayout);
      } else if (type === "Categories") {
        const { categories } = req.body;

        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        const categoriesLayout = {
          type: "Categories",
          categories: categoriesItems,
        };

        await layoutModel.create(categoriesLayout);
      } else {
        return next(new ErrorHandler("Invalid layout type", 400));
      }
      res.status(201).json({
        success: true,
        message: "Layouts created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const bannerData = await layoutModel.findOne({ type: "Banner" });

        if (bannerData) {
          // Delete the existing banner image from Cloudinary
          await cloudinary.v2.uploader.destroy(req.body.public_id);
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const updatedBanner = {
          type: "Banner",
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };

        // Update the existing banner layout
        await layoutModel.findByIdAndUpdate(bannerData?._id, { updatedBanner });
      } else if (type === "FAQ") {
        const { faq } = req.body;
        const faqData = await layoutModel.findOne({ type: "FAQ" });
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        // Update the FAQ layout
        await layoutModel.findByIdAndUpdate(faqData?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      } else if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await layoutModel.findOne({
          type: "Categories",
        });
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        // Update the Categories layout
        await layoutModel.findByIdAndUpdate(categoriesData?._id, {
          type: "Categories",
          categories: categoriesItems,
        });
      } else {
        return next(new ErrorHandler("Invalid layout type", 400));
      }

      res.status(200).json({
        success: true,
        message: "Layouts updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get layout
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const layout = await layoutModel.findOne(req.body);

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
