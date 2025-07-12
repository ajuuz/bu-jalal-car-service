'use client'

import React, {useState} from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginType } from '@/zodSchema/authZodSchema'



const LoginForm = () => {

    const [formData,setFormData]=useState<LoginType>({
        email:'',
        password:''
    })

    const handleLogin=()=>{

    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
    }

  return (
        <div className="flex flex-col gap-4 w-full">

            <Input  onChange={handleChange} name='email'  placeholder="email: example@gmail.com"/>
            {/* {state?.errors?.email && (<p className="text-red-500 text-xs">{state.errors.email[0]}</p>)} */}

            <Input  onChange={handleChange} name='password' type='password' placeholder="password"/>
             {/* {state?.errors?.password && (<p className="text-red-500 text-xs">{state.errors.password[0]}</p> )} */}

            <Button onClick={handleLogin} className="w-full">Login</Button>
        </div>
  )
}

export default LoginForm
