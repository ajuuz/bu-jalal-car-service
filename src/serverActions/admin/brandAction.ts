'use server'

import dbConnect from "@/lib/mongodb";
import { ServerActionResponse } from "@/types/serverActionResponse";
import { BrandFormType, brandFormZodSchema, FormType, formZodSchema } from "@/zodSchema/formZodSchema";
import { uploadImages } from "../common/uploadImageAction";
import { brandModel } from "@/models/brand";

export const createBrand=async(brandDetails:BrandFormType):Promise<Omit<ServerActionResponse<undefined>,'data'>>=>{

     const parsed = brandFormZodSchema.safeParse(brandDetails)
      if(!parsed.success){
        throw new Error('All fields are required')
    }
    
    try{
    const response = await uploadImages(brandDetails.images as File[])
        if(!response.success){
           throw new Error('Error in uploading Image')
        }
        
        const brandData={
            name:brandDetails.name,
            imageId:response.data[0]
        }
        await dbConnect()
        const newBrand = new brandModel(brandData);
        await newBrand.save()
        return {success:true,message:'New Brand Added Successfully'}
    }
    catch(error:any){
        console.log(error)
        if(error?.code===11000){
            throw new Error('Brand name already exists')
        }
        
        throw error
    }
}