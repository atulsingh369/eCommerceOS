"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="bg-muted px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-2" variant="secondary">
            New Collection Arrived
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Elevate Your Lifestyle
        </motion.h1>

        <motion.p
          className="max-w-[700px] text-muted-foreground md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover our curated selection of premium electronics, fashion, and
          home essentials. Designed for the modern aesthetic.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/products">
            <Button size="lg" className="px-8 transition-all hover:scale-105">
              Shop Now
            </Button>
          </Link>
          <Link href="/categories">
            <Button
              variant="outline"
              size="lg"
              className="px-8 transition-all hover:scale-105 hover:bg-background"
            >
              Browse Categories
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
