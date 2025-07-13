import mongoose, { models, ObjectId, Schema } from "mongoose";


interface IBrandEntity{
    _id:ObjectId,
    imageId:string,
    name:string
}

interface IBrandModel extends Omit<IBrandEntity,'_id'>,Document{
    _id:ObjectId
}

const brandSchema:Schema<IBrandModel> = new mongoose.Schema<IBrandModel>({
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

export const brandModel = models.brand || mongoose.model<IBrandModel>('brand',brandSchema)