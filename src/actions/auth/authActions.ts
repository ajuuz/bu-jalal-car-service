'use server'
import dbConnect from '@/lib/mongodb';
import { userModel } from '@/models/user';
import {signupZodSchema, type SignupType } from '@/zodSchema/authZodSchema';
import z from 'zod';


export const createUser=async (formData:SignupType):Promise<void>=>{

  const parsed = signupZodSchema.safeParse(formData);
  if(!parsed.success){
    const fieldErrors=z.treeifyError(parsed.error)
  }
  await dbConnect();
  const newUser = new userModel(formData);
  await newUser.save()
  
}