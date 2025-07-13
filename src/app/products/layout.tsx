import { ProductFilterBar } from "@/components/user/ProductFilterBar";

export default function ProductLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <ProductFilterBar/>
      <main>{children}</main>
    </div>
  )
}
