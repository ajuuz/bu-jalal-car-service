import mongoose, { models, ObjectId, Schema } from "mongoose";


interface ICategoryEntity{
    _id:ObjectId,
    imageId:string,
    name:string
}

interface ICategoryModel extends Omit<ICategoryEntity,'_id'>,Document{
    _id:ObjectId
}

const categorySchema:Schema<ICategoryModel> = new mongoose.Schema<ICategoryModel>({
    imageId:{
       type:String,
       required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
})

export const categoryModel = models.category || mongoose.model<ICategoryModel>('category',categorySchema)