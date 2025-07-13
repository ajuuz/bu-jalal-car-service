'use server'

import dbConnect from "@/lib/mongodb";
import { categoryModel } from "@/models/category";
import { ServerApiResponse } from "@/types/serverApiResponse";
import { FormType, formZodSchema } from "@/zodSchema/formZodSchema";
import { uploadImages } from "../common/uploadImageAction";

export const createCategory=async(categoryDetails:FormType):Promise<Omit<ServerApiResponse<undefined>,'data'>>=>{

     const parsed = formZodSchema.safeParse(categoryDetails)
      if(!parsed.success){
        throw new Error('All fields are required')
    }
    
    try{
    const response = await uploadImages(categoryDetails.images as File[])
        if(!response.success){
           throw new Error('Error in uploading Image')
        }
        
        const categoryData={
            name:categoryDetails.name,
            imageId:response.data[0]
        }
        await dbConnect()
        const newCategory = new categoryModel(categoryData);
        await newCategory.save()
        return {success:true,message:'New Category Added Successfully'}
    }
    catch(error:any){
        console.log(error)
        if(error?.code===11000){
            throw new Error('Category name already exists')
        }
        
        throw error
    }
}