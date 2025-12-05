import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { getProducts, getCategories, Category } from "@/lib/db/products";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    sort?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const categoryFilter = searchParams.category;
  const sortOption = searchParams.sort;

  const products = await getProducts({
    category: categoryFilter,
    sort: sortOption,
  });
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Categories</h3>
            <div className="space-y-2">
              <Link
                href="/products"
                className={`block text-sm ${
                  !categoryFilter
                    ? "font-bold text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Categories
              </Link>
              {categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className={`block text-sm ${
                    categoryFilter === category.slug
                      ? "font-bold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Min" className="h-8" />
              <Input type="number" placeholder="Max" className="h-8" />
            </div>
            <Button variant="secondary" size="sm" className="w-full mt-2">
              Apply
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {categoryFilter
                ? categories.find((c: Category) => c.slug === categoryFilter)
                    ?.name || "Products"
                : "All Products"}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {products.length} products
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {products.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No products found in this category.
                </p>
                <Link href="/products">
                  <Button variant="link" className="mt-2">
                    Clear Filters
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Pagination Placeholder */}
          {products.length > 0 && (
            <div className="flex justify-center mt-12 space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" disabled>
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
