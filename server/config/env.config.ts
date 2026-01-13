import * as dotenv from 'dotenv';

dotenv.config()

export const envConfig = {
  PORT: process.env.PORT,
  frontendURL: process.env.FRONTEND_URL as string,
  mongoURI: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET_KEY as string,
  jwtRefresh: process.env.JWT__REFRESH_SECRET_KEY as string,
  jikan_api: process.env.JIKAN_API,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
}