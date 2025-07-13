'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getBrands } from '@/services/user/brandApi';
import { getCategories } from '@/services/user/categoriesApi';
import { getSubCategories } from '@/services/user/subCategoriesApi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

export const ProductFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("query") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.getAll("brand"));
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(searchParams.getAll("subcategory"));

  const [brands, setBrands] = useState<Pick<BrandDTO, '_id' | 'name'>[]>([]);
  const [subCategories, setSubCategories] = useState<Pick<SubCategoryDTO, '_id' | 'name'>[]>([]);

  useEffect(() => {
    (async () => {
      const [brandList,categoryList, subCategoryList] = await Promise.all([
        getBrands(true),
        getCategories(true), // optional
        getSubCategories(true),
      ]);

      setBrands(brandList);
      
      setSubCategories(subCategoryList);
    })();
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (search.trim()) params.set("query", search.trim());
    if(selectedBrands.length) params.set("brand",selectedBrands.join('|'))
    if(selectedSubCategories.length) params.set("subCategory",selectedSubCategories.join(','))
    
    router.push(`?${params.toString()}`);
  };

  const toggleSelection = (id: string, selectedList: string[], setSelected: (v: string[]) => void) => {
    if (selectedList.includes(id)) {
      setSelected(selectedList.filter(item => item !== id));
    } else {
      setSelected([...selectedList, id]);
    }
  };

  return (
    <form
      onSubmit={handleFilter}
      className="w-full bg-white p-4 rounded-xl shadow flex flex-col md:flex-row items-center gap-4"
    >
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-6 text-base rounded-xl border-gray-300 focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Brand Multi-select Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full md:w-1/4 py-6 rounded-xl justify-start text-left">
            {selectedBrands.length > 0
              ? `${selectedBrands.length} brand(s) selected`
              : "Select Brands"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandGroup>
              {brands.map((brand) => (
                <CommandItem key={brand._id}>
                  <Checkbox
                    checked={selectedBrands.includes(brand._id)}
                    onCheckedChange={() =>
                      toggleSelection(brand._id, selectedBrands, setSelectedBrands)
                    }
                    className="mr-2"
                  />
                  {brand.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Subcategory Multi-select Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full md:w-1/4 py-6 rounded-xl justify-start text-left">
            {selectedSubCategories.length > 0
              ? `${selectedSubCategories.length} subcategory(s)`
              : "Select Subcategories"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandGroup>
              {subCategories.map((sub) => (
                <CommandItem key={sub._id}>
                  <Checkbox
                    checked={selectedSubCategories.includes(sub._id)}
                    onCheckedChange={() =>
                      toggleSelection(sub._id, selectedSubCategories, setSelectedSubCategories)
                    }
                    className="mr-2"
                  />
                  {sub.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Button type="submit" className="rounded-xl px-8 py-6 text-base w-full md:w-auto">
        Filter
      </Button>
    </form>
  );
};
