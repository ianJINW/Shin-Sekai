import multer, { memoryStorage } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "../config/env.config";

cloudinary.config({
	cloud_name: envConfig.cloudinary_cloud_name,
	api_key: envConfig.cloudinary_api_key,
	api_secret: envConfig.cloudinary_api_secret,
});

const storage = memoryStorage();

const uploads = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 },
});

export { cloudinary };
export default uploads;
