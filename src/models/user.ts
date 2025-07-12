import { ROLES } from "@/shared/constants/enums";
import mongoose, { models, ObjectId, Schema } from "mongoose";

interface IUserEntity{
    _id:ObjectId
    name:string,
    email:string,
    password:string,
    role:ROLES
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
    },
    role:{
        type:String,
        required:true,
        default:ROLES.USER,
        enum:[ROLES.ADMIN,ROLES.USER]
    },
},{timestamps:true})

export const userModel =models.User || mongoose.model<IUserModel>('User',userSchema)