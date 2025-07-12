'use client'

import React, {useState} from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {SignupType, signupZodSchema } from '@/zodSchema/authZodSchema'
import { createUser } from '@/actions/auth/authActions'
import { treeifyError } from 'zod'

type Props={
    setTab:React.Dispatch<React.SetStateAction<'signup' | 'login'>>
}

const SignupForm = ({setTab}:Props) => {

    const [formData,setFormData]=useState<SignupType>({
        name:'',
        email:'',
        password:''
    })

    const [error,setErrors]=useState<Partial<Record<keyof SignupType,string>>>({})


     const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSignup=async()=>{
        const parsed = signupZodSchema.safeParse(formData);

        if(!parsed.success){
            const tree=treeifyError(parsed.error)
            const formattedErrors:Partial<Record<keyof SignupType,string>>={
                name: tree.properties?.name?.errors?.[0],
                email: tree.properties?.email?.errors?.[0],
                password: tree.properties?.password?.errors?.[0],
            }

            setErrors(formattedErrors)
            setTimeout(()=>setErrors({}),3000)
            return;
        }

        const response = await createUser(parsed.data);
            if(!response.success){
                console.log(response.message)
            }else{
                console.log(response.message)
                setTab(prev=>prev==='login'?'signup':'login')
            }
    }

  return (
        <div className="flex flex-col gap-4 w-full">
            <Input onChange={handleChange} name="name" placeholder="John Doe" />
               {error.name && (<p className="text-red-500 text-xs">{error.name}</p>)}

            <Input onChange={handleChange} name='email'  placeholder="email: example@gmail.com"/>
            {error.email && (<p className="text-red-500 text-xs">{error.email}</p>)}

            <Input onChange={handleChange} name='password' type='password'  placeholder="password"/>
             {error.password && (<p className="text-red-500 text-xs">{error.password}</p> )}

            <Button onClick={handleSignup} className="w-full">Sign Up</Button>
        </div>
  )
}

export default SignupForm
