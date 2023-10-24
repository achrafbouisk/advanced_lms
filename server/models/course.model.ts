import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IComment[];
}

export interface IReviw extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

export interface ILink extends Document {
  title: string;
  url: string;
}
export interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayr: string;
  lessons: ILink[];
  suggestion: string;
  question: IComment[];
  reviews: IReviw[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: string;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReviw[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

const ReviwSchema: Schema<IReviw> = new mongoose.Schema({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  commentReplies: [Object],
});
const LinkSchema: Schema<ILink> = new mongoose.Schema({
  title: String,
  url: String,
});
const ComentSchema: Schema<IComment> = new mongoose.Schema({
  user: Object,
  question: String,
  questionReplies: [Object],
});
const CourseDataSchema: Schema<ICourseData> = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayr: String,
  lessons: [LinkSchema],
  suggestion: String,
  question: [ComentSchema],
  reviews: [ReviwSchema],
});
const courseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
        // required: true
      },
      url: {
        type: String,
        // required: true
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [ReviwSchema],
    courseData: [CourseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;
