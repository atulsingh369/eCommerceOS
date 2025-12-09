import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-6">About DevStudios</h1>

      <p className="text-xl text-muted-foreground mb-8 text-left md:text-center leading-relaxed">
        This eCommerce platform is fully designed, engineered, and owned by 
        <span className="font-semibold bg-gradient-to-r from-[#3CFF9D] to-[#2DBAFF] bg-clip-text text-transparent"> DevStudios</span>. 
        It represents a production-grade architecture showcasing modern commerce capabilities such as 
        advanced product search, AI-powered recommendations, real-time cart experience, 
        blazing fast page rendering, and SEO-optimized routing.
      </p>

      <div className="text-left bg-muted p-8 rounded-xl space-y-4 mb-10">
        <h2 className="text-2xl font-bold">What This Platform Demonstrates</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>AI Shopping Assistant with real-time product search</li>
          <li>Next.js 14 App Router with server-side streaming</li>
          <li>Lightning-fast UI built with Tailwind & Shadcn UI</li>
          <li>Scalable Firebase Authentication & Firestore DB</li>
          <li>Optimized rendering, instant navigation & edge caching</li>
          <li>Responsive design with premium modern UX standards</li>
        </ul>
      </div>

      <p className="text-lg text-muted-foreground mb-10">
        If you’re looking to build a custom, high-performance eCommerce platform 
        or transform your existing store with AI automation, DevStudios can design and 
        develop it end-to-end. We specialize in scalable architecture, AI automation, and pixel-perfect UX.
      </p>

      <div className="flex md:flex-row flex-col md:justify-center gap-4">
        <Link href="/contact">
          <Button size="full">Build Your Store With Us</Button>
        </Link>
        <Link href="/">
          <Button size="full" variant="outline">
            Back to Home
          </Button>
        </Link>
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} DevStudios. All rights reserved.
        <br />
        <br />
        This e-commerce platform is owned & operated by DevStudios. Unauthorized reproduction or distribution or commercial deployment without written permission is strictly prohibited.
      </p>
    </div>
  );
}
