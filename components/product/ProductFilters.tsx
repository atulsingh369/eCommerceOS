"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 1800]); // Default range

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
      <div className="px-2">
        <Slider
          defaultValue={priceRange}
          max={2000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="w-full mt-2"
        onClick={handleApply}
      >
        Apply
      </Button>
    </div>
  );
}
