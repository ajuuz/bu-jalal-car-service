import mongoose, { models, ObjectId, Schema } from "mongoose";


interface ISubCategoryEntity{
    _id:ObjectId,
    imageId:string,
    name:string,
    category:ObjectId
}

interface ISubCategoryModel extends Omit<ISubCategoryEntity,'_id'>,Document{
    _id:ObjectId
}

const subCategorySchema:Schema<ISubCategoryModel> = new mongoose.Schema<ISubCategoryModel>({
    imageId:{
       type:String,
       required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    }
})

export const subCategoryModel = models.subcategory || mongoose.model<ISubCategoryModel>('subcategory',subCategorySchema)