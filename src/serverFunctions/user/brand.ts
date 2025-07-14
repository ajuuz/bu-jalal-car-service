import dbConnect from "@/lib/mongodb"
import { brandModel } from "@/models/brand"
import { ServerApiResponse } from "@/types/serverApiResponse";



export const getBrands=async():Promise<ServerApiResponse<BrandDTO[]>>=>{
    await dbConnect()
    try{
        const brands = await brandModel.find();
        return {success:true,message:"Brands fetched Successfully",data:brands}
    }
    catch(error){
        return {success:false,message:"Failed to fetch Brands"}
    }
}