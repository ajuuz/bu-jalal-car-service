import mongoose, { models, ObjectId, Schema } from "mongoose";


export interface IProductEntity{
    _id:ObjectId,
    imageIds:string[],
    name:string,
    brand:ObjectId,
    subCategory:ObjectId,
    price:number,
    description:string
}

interface IProductModel extends Omit<IProductEntity,'_id'>,Document{
    _id:ObjectId
}

const productSchema:Schema<IProductModel> = new mongoose.Schema<IProductModel>({
    imageIds:{
       type:[String],
       required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'subcategory'
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

export const productModel = models.product || mongoose.model<IProductModel>('product',productSchema)