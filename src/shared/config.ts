


export const config={
     DATABASE:{
        uri:process.env.DATABASE_URI 
    },
     CLOUDINARY:{
        CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY:process.env.CLOUDINARY_API_KEY,
        API_SECRETE:process.env.CLOUDINARY_API_SECRETE,
        IMAGE_BASE_URL:process.env.NEXT_PUBLIC_IMAGE_BASE_URL
    }
}