'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
     <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          {/* <img src={logo} alt="Logo" className="w-25" /> */}
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">ALL PRODUCTS</Link>
          <Link href="/brands">BRANDS</Link>
          <Link href="/categories">CATEGORIES</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Button className="bg-black text-white px-4 py-1 rounded">contact 📞</Button>
        </div>
      </header>
  )
}

export default Header
