'use server';

import cloudinary from "@/lib/cloudinary";

export async function uploadImages(images:File[]) {

  if (!images.length) {
    throw new Error("No image data provided");
  }

  try{
      const uploadPromises = images.map(async (image) => {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          return new Promise<string>((resolve, reject) => {
              const upload = cloudinary.uploader.upload_stream(
                  { folder: "uploads" },
                  (error, result) => {
                      if (error || !result) reject(error);
                      else resolve(result.public_id);
                    }
                );
                
                upload.end(buffer);
            });
        });
        
        const imageIds = await Promise.all(uploadPromises);
        return {success:true,message:'Images uploaded Successfully',data:imageIds}
    }
    catch(error){
        throw new Error("Error happened during uploading image");
    }
}
