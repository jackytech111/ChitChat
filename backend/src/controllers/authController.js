import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60; // 14 ngày (tính bằng giây)

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Tên người dùng đã tồn tại" });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    // Trả về phản hồi thành công
    res.status(201).json({ message: "Dăng ký thành công" });
  } catch (error) {
    console.log("Lỗi khi đăng ký", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng ký người dùng" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Tên người dùng hoặc mật khẩu không đúng" });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Tên người dùng hoặc mật khẩu không chính xác" });
    }

    // nếu khớp, tạo access token (JWT) và trả về cho client
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // Tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // taọ sesion mới để lưu
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL * 1000), // thời gian hết hạn của refresh token
    });

    // Trả refresh token về trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL * 1000,
    });

    // Trả về access token và thông tin người dùng
    return res.status(200).json({
      message: `Người dùng ${user.displayName} đăng nhập thành công`,
      accessToken,
    });
  } catch (error) {
    console.log("Lỗi khi đăng nhập", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng nhập" });
  }
};

export const signOut = async (req, res) => {
  try {
  } catch (error) {
    console.log("Lỗi khi đăng xuất", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng xuất" });
  }
};
