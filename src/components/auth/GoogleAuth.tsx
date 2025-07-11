'use client'

import React from 'react'
import { FaGoogle } from 'react-icons/fa'

const GoogleAuth = () => {
  return (
    <div className="bg-black/90 border-2 border-slate-500 w-full flex justify-center items-center  py-3 rounded-md">
        <FaGoogle className="text-white"/>
    </div>
  )
}

export default GoogleAuth
