import { getProducts, getCategories } from "@/lib/db/products";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default async function Home() {
  const featuredProducts = await getProducts({ featured: true });
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-12 pb-10">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Categories */}
      <CategoryGrid categories={categories} />

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-2xl p-8 md:p-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
          <p className="mb-8 max-w-lg mx-auto text-primary-foreground/80">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            design inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input id="email" placeholder="Enter your email"/>
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              className="text-base"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
