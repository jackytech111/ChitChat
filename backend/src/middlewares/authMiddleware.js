import jwt from "jsonwebtoken";
import User from "../models/User.js";

// authorization - xác minh user là ai
export const protectedRoute = async (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // xác nhận token tồn tại
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy access token" });
    }

    // xác minh token
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);

          return res
            .status(403)
            .json({ message: "Access token hết hạn hoặc không đúng" });
        }

        // tìm user
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword",
        );

        if (!user) {
          return res.status(404).json({ message: "Nguời dùng không tồn tại" });
        }

        // trả về user đã xác minh
        req.user = user;
        next();
      },
    );
  } catch (error) {
    console.error("Lỗi  khi xác mình JWT trong authMiddleware", error);
    return res.status(500).json({ message: "Lỗi máy chủ khi xác minh token" });
  }
};
