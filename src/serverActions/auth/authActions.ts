'use server'
import dbConnect from '@/lib/mongodb';
import { userModel } from '@/models/user';
import { ServerApiResponse } from '@/types/serverApiResponse';
import {signupZodSchema, type SignupType } from '@/zodSchema/authZodSchema';
import { redirect } from 'next/navigation';
import { treeifyError } from 'zod';


export const createUser=async (formData:SignupType):Promise<Omit<ServerApiResponse<undefined>,'data'>>=>{

  const parsed = signupZodSchema.safeParse(formData);
  if(!parsed.success){
     return {success:false,message:'Validation Error'}
    }
    
    try{
        await dbConnect();
      const newUser = new userModel(formData);
      await newUser.save()
      return {success:true,message:'User Signed Up Successfully'}
    }
    catch(error:any){
        if(error?.code===11000){
            return {success:false,message:'Email already exists'}
        }

        return {success:false,message:'Internal Server Error'}
    }
  
}