import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
};

if (
  !cloudinaryConfig.cloud_name ||
  !cloudinaryConfig.api_key ||
  !cloudinaryConfig.api_secret
) {
  throw new Error(
    "Cloudinary configuration is missing. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env."
  );
}

// Configuration
cloudinary.config(cloudinaryConfig);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    // console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload failed:", error?.message || error);
    return null;
  }
};

export { uploadOnCloudinary };
