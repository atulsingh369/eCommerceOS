import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { products, categories } from "@/lib/mockData";
import { SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h3>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-primary transition-colors font-medium text-foreground"
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Price Range</h4>
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded border px-2 py-1"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Apply
              </Button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <span className="text-sm text-muted-foreground">
              {products.length} Results
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2">New</Badge>
                  )}
                </div>
                <CardContent className="p-4 pt-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg leading-tight hover:underline line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground capitalize mt-1">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="secondary">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            {/* Mock Duplicate Items to fill grid for demo */}
            {[...products].reverse().map((product) => (
              <Card key={`${product.id}-dup`} className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 pt-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg leading-tight hover:underline line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground capitalize mt-1">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="secondary">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                className="bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
