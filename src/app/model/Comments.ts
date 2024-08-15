import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts", // Tham chiếu đến schema Posts
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
