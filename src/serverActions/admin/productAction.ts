'use server'

import dbConnect from "@/lib/mongodb";
import { ServerActionResponse } from "@/types/serverActionResponse";
import {  ProductFormType, productZodeFormSchema } from "@/zodSchema/formZodSchema";
import { uploadImages } from "../common/uploadImageAction";
import { productModel } from "@/models/product";
import { Types } from "mongoose";

export const createProduct=async(productDetails:ProductFormType):Promise<Omit<ServerActionResponse<undefined>,'data'>>=>{

     const parsed = productZodeFormSchema.safeParse(productDetails)
      if(!parsed.success){
        throw new Error('All fields are required')
    }
    
    try{
    const response = await uploadImages(productDetails.images as File[])
        if(!response.success){
           throw new Error('Error in uploading Image')
        }
        
        const brand = new Types.ObjectId(productDetails.brand)
        const subCategory = new Types.ObjectId(productDetails.subCategory)
        const productData={...productDetails,imageIds:response.data,brand,subCategory}
        await dbConnect()
        const newProduct = new productModel(productData);
        await newProduct.save()
        return {success:true,message:'New Product Added Successfully'}
    }
    catch(error:any){
        console.log(error)
        if(error?.code===11000){
            throw new Error('Product name already exists')
        }
        
        throw error
    }
}