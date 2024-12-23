import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APICLOUD,
    api_secret: process.env.APISECRET // Click 'View API Keys' above to copy your API secret
});


export default cloudinary