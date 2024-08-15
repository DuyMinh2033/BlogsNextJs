import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB as string);
    if (db) console.log("connect db success");
  } catch (error) {
    throw new Error("Connection Failed");
  }
};

export default connectDb;
