'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Brand', href: '/admin/brand' },
  { name: 'Category', href: '/admin/category' },
  { name: 'Product', href: '/admin/product' },
]

export default function Header() {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between fixed top-0">
      <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
        <span className="text-blue-600">Meta</span>
        <span className="text-gray-800">Mentor</span>
      </Link>

      <nav className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Button variant="outline" size="sm">
        Logout
      </Button>
    </header>
  )
}
