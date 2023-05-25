import { v2 } from 'cloudinary';

export const Cloudinary = {
  provide: 'Cloudinary',
  useFactory: ()=> {
    return v2.config({
      cloud_name: "dky6n9g8p",
      api_key: "745645826696366",
      api_secret: "V64RjEfM0LesxA964uj-ks44X84"
    });
  },
};