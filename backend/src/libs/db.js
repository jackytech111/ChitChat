import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONECTION_STRING);
    console.log("Liên kết cơ sở dũ liệu thành công!");
  } catch (error) {
    console.log("Lỗi khi kết nối đến cơ sở dũ liệu", error);
    process.exit(1);
  }
};
