import express from "express";
import multer from "multer";
import {
  authMe,
  searchUserByUsername,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const uploadAvatarFile = (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "Kích thước ảnh tối đa là 10MB" });
      }

      return res.status(400).json({ message: error.message });
    }

    return res.status(400).json({
      message: error.message || "Tệp tải lên không hợp lệ",
    });
  });
};

router.get("/me", authMe);
router.get("/search", searchUserByUsername);
router.post("/uploadAvatar", uploadAvatarFile, uploadAvatar);

export default router;
