import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Pencil } from "lucide-react"

const brands = [
  { id: 1, name: "Meta", createdAt: "2024-07-01" },
  { id: 2, name: "Apple", createdAt: "2024-06-25" },
  { id: 3, name: "Samsung", createdAt: "2024-06-20" },
  { id: 4, name: "OnePlus", createdAt: "2024-06-15" },
]

export default function Page() {
  return (
    <div className=" bg-gradient-to-br from-gray-100 to-white p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Brands</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage all product brands from here.</p>
        </div>

        <Button className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Brand
        </Button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-md overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100/80">
            <TableRow>
              <TableHead className="text-gray-600 text-sm font-semibold w-12">#</TableHead>
              <TableHead className="text-gray-600 text-sm font-semibold">Brand</TableHead>
              <TableHead className="text-gray-600 text-sm font-semibold">Created At</TableHead>
              <TableHead className="text-right text-gray-600 text-sm font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {brands.map((brand, i) => (
              <TableRow key={brand.id} className="hover:bg-gray-50/80 transition-all">
                <TableCell className="text-sm font-medium text-gray-800">{i + 1}</TableCell>
                <TableCell className="text-sm text-gray-900">{brand.name}</TableCell>
                <TableCell className="text-sm text-gray-700">{brand.createdAt}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="rounded-md">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
