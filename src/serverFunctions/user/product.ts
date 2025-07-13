import { IProductEntity, productModel } from "@/models/product";
import { Types } from "mongoose";

export const getProducts=async(query?:string,brand?:string,subCategory?:string)=>{

    const filter:any={};

    if(query?.trim()){
        filter.name={ $regex: new RegExp(query, 'i') };
    }
    if(brand?.trim()){
        const brands = brand.split('|')
        const transformedBrands=brands.map(brand=>new Types.ObjectId(brand))
        filter.brand={$in:transformedBrands}
    }
    if(subCategory?.trim()){
        const subCategories = subCategory.split('|')
        const transformedSubCategories=subCategories.map(subCategory=>new Types.ObjectId(subCategory))
        filter.subCategory={$in:transformedSubCategories}
    }

    try{
        const products=await productModel.aggregate([
            {
                $match:filter
            },
            {
                $lookup:{
                    from:'brands',
                    localField:'brand',
                    foreignField:'_id',
                    as:'brand'
                }
            },
            {
                $unwind:'$brand'
            },
            {
                $lookup:{
                    from:'subcategories',
                    localField:'subCategory',
                    foreignField:'_id',
                    as:'subCategory'
                }
            },
            {
                $unwind:'$subCategory'
            },
            {
                $project:{
                    name:1,
                    imageIds:1,
                    description:1,
                    price:1,
                    brand:'$brand.name',
                    subCategory:'$subCategory.name'
                }
            }
        ])
        
        return {success:true,message:'products fetched successfully',data:products}
    }
    catch(error){
        return {success:false,message:"failed to fetch products",data:[]}
    }

}