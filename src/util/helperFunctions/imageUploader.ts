import { uploadImage } from "@/services/common/uploadImageApi";

export const imageUploader=async(images:File[])=>{
        const imageData = new FormData();
        images.forEach((image)=>{
            imageData.append('image',image);
        })
    try{
        const imageUploadResult = await uploadImage(imageData);
        return imageUploadResult.urls;
    }
    catch(error){
        throw error;
    }
}