'use server'

import dbConnect from "@/lib/mongodb";
import { ServerActionResponse } from "@/types/serverActionResponse";
import { SubCatFormType, subCatFormZodSchema } from "@/zodSchema/formZodSchema";
import { uploadImages } from "../common/uploadImageAction";
import { Types } from "mongoose";
import { subCategoryModel } from "@/models/subCategory";

export const createSubCategory=async(subCategoryDetails:SubCatFormType):Promise<Omit<ServerActionResponse<undefined>,'data'>>=>{

     const parsed = subCatFormZodSchema.safeParse(subCategoryDetails)
      if(!parsed.success){
        throw new Error('All fields are required')
    }
    
    try{
    const response = await uploadImages(subCategoryDetails.images as File[])
        if(!response.success){
           throw new Error('Error in uploading Image')
        }
        
        const subCategoryData={
            name:subCategoryDetails.name,
            imageId:response.data[0],
            category:new Types.ObjectId(subCategoryDetails.category)
        }
        await dbConnect()
        const newSubCategory = new subCategoryModel(subCategoryData);
        await newSubCategory.save()
        return {success:true,message:'New subcategory Added Successfully'}
    }
    catch(error:any){
        console.log(error)
        if(error?.code===11000){
            throw new Error('Sub Category name already exists')
        }
        
        throw error
    }
}