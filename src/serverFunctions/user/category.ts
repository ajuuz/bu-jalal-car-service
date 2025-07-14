import dbConnect from "@/lib/mongodb"
import { categoryModel } from "@/models/category";
import { ServerApiResponse } from "@/types/serverApiResponse";



export const getCategories=async():Promise<ServerApiResponse<BrandDTO[]>>=>{
    await dbConnect()
    try{
        const categories = await categoryModel.find();
        return {success:true,message:"Categories fetched Successfully",data:categories}
    }
    catch(error){
        return {success:false,message:"Failed to fetch Categories"}
    }
}