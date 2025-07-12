

// app/admin/layout.tsx

import Header from "@/components/admin/Header"

export default function AdminLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="pt-20 bg-gray-100 min-h-screen">
      <Header/>
      <main>{children}</main>
    </div>
  )
}
