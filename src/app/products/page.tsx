// app/products/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ProductFilterBar } from "@/components/user/ProductFilterBar";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

// 🧠 Simulated DB call with query param
async function fetchProducts(brand?: string): Promise<Product[]> {
  const allProducts = [
    { id: "1", name: "Headphones", price: 199.99, image: "/images/headphones.jpg", brand: "Sony" },
    { id: "2", name: "Mouse", price: 49.99, image: "/images/mouse.jpg", brand: "Logitech" },
    { id: "3", name: "Watch", price: 149.99, image: "/images/watch.jpg", brand: "Samsung" },
    { id: "4", name: "Speaker", price: 89.99, image: "/images/speaker.jpg", brand: "JBL" },
  ];

  if (brand) {
    return allProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  return allProducts;
}

export default async function Page({ searchParams }: { searchParams: { brand?: string } }) {
  const products = await fetchProducts(searchParams.brand);

  return (
    <ProductFilterBar/>
  );
}
