import { uploadImageFromBuffer } from "../middlewares/uploadMiddleware.js";
import User from "../models/User.js";

export const authMe = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Failed to call authMe", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || username.trim() === "") {
      return res
        .status(400)
        .json({ message: "Username query parameter is required." });
    }

    const user = await User.findOne({ username }).select(
      "_id displayName username avatarUrl",
    );

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Failed to search user by username", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Uploaded file must be an image" });
    }

    const result = await uploadImageFromBuffer(file.buffer);

    if (!result?.secure_url || !result?.public_id) {
      return res.status(502).json({
        message: "Cloudinary did not return a valid uploaded image",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: result.secure_url,
        avatarId: result.public_id,
      },
      {
        new: true,
      },
    ).select("avatarUrl");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!updatedUser.avatarUrl) {
      return res.status(400).json({ message: "Avatar URL is null" });
    }

    return res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.error("Failed to upload avatar", error);

    const errorMessage = error?.message || "Upload failed";

    return res.status(500).json({ message: errorMessage });
  }
};
