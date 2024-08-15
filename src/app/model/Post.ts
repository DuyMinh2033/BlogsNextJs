import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    categories: {
      type: [String], // Mảng các chuỗi lưu trữ danh mục
    },
  },
  { timestamps: true }
);

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);
