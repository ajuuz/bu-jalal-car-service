import mongoose, { ObjectId, Schema } from "mongoose";

interface IUserEntity{
    _id:ObjectId
    name:string,
    email:string,
    password:string
}

interface IUserModel extends Omit<IUserEntity,'_id'>,Document{
    _id:ObjectId
}

const userSchema:Schema<IUserModel>=new mongoose.Schema<IUserModel>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

export const userModel = mongoose.model<IUserModel>('User',userSchema)