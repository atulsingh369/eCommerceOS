"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/mockData";

export default function Home() {
  const featuredProducts = products.filter((p) => p.isNew).slice(0, 3);

  return (
    <div className="flex flex-col gap-12 pb-10">
      {/* Hero Section */}
      <section className="bg-muted px-4 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto flex flex-col items-center text-center space-y-4">
          <Badge className="mb-2" variant="secondary">
            New Collection Arrived
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Elevate Your Lifestyle
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover our curated selection of premium electronics, fashion, and
            home essentials. Designed for the modern aesthetic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products">
              <Button size="lg" className="px-8">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="px-8">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-primary hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                href={`/products?category=${category.slug}`}
                key={category.id}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <span className="hidden group-hover:inline-block px-4 py-2 border border-white rounded-full text-sm font-medium transition-opacity">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-2xl p-8 md:p-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
          <p className="mb-8 max-w-lg mx-auto text-primary-foreground/80">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            design inspiration.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
            />
            <Button variant="secondary" size="lg" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
