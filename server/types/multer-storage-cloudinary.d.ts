declare module "multer-storage-cloudinary" {
  import { StorageEngine } from "multer";
  import { Cloudinary } from "cloudinary";

  interface CloudinaryStorageOptions {
    cloudinary: typeof Cloudinary;
    params?: any;
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(opts: CloudinaryStorageOptions);
  }
}
