"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export function ProductImageGallery({
  images,
  name,
}: ProductImageGalleryProps) {
  const uniqueImages = Array.from(new Set(images)); // Deduplicate
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg bg-muted border">
        <Image
          src={uniqueImages[selectedIndex]}
          alt={name}
          fill
          className="object-cover transition-all duration-300 hover:scale-105"
          priority
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {uniqueImages.map((img, i) => (
          <button
            key={i}
            className={cn(
              "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all snap-start",
              selectedIndex === i
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={img}
              alt={`${name} view ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
