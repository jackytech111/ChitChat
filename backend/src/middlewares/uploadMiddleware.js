import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith("image/")) {
      return cb(new Error("Chỉ cho phép tải tệp ảnh"));
    }

    cb(null, true);
  },
});

export const uploadImageFromBuffer = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const cloudinaryConfig = cloudinary.config();
    if (
      !cloudinaryConfig.cloud_name ||
      !cloudinaryConfig.api_key ||
      !cloudinaryConfig.api_secret
    ) {
      reject(new Error("Cloudinary is not configured"));
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "chitchat_chat/avatars",
        resource_type: "image",
        transformation: [{ width: 200, height: 200, crop: "fill" }],
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("Cloudinary upload returned an empty result"));
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(buffer);
  });
};
