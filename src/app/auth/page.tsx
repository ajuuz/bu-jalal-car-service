'use client'

import LoginForm from "@/components/auth/LoginForm";
import GoogleAuth from "@/components/auth/GoogleAuth";
import SignupForm from "@/components/auth/SignupForm";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const page = () => {
    const [tab,setTab]=useState<'login'|'signup'>('login');

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-6 justify-between items-center">
            <div className=" flex flex-col gap-2">
                <div className="flex">
                    <div onClick={()=>setTab('login')} className={`${tab==='login' && 'bg-black text-white'}  flex-1 text-center p-3 rounded`}>Login</div>
                    <div onClick={()=>setTab('signup')} className={`${tab==='signup' && 'bg-black text-white'} flex-1 text-center p-3 rounded`}>Signup</div>
                </div>
                <h1 className="text-3xl font-semibold text-center">{tab==='login'?"Login your account":"Create an account"}</h1>
                <p>Enter your email and Password below to {tab} your account</p>
            </div>

            {
                tab==='login'
                ?<LoginForm/>
                :<SignupForm setTab={setTab}/>
            }

            <div className="flex items-center w-full">
                <Separator className="border-2 flex-1"/>
                    <span className="text-muted-foreground font-medium mx-2 text-xs">OR CONTINUE WITH</span>
                <Separator className="border-2 flex-1"/>
            </div>

            <GoogleAuth/>
            
        </div>
    </div>
  )
}

export default page
