"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/Slider";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 14000]); // Default range
  const [loading, setLoading] = useState(false);

  const handleApply = (value: number[]) => {
    setLoading(true);
    setPriceRange(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/products?${params.toString()}`);
    setLoading(false);
  };

  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    } else {
      setPriceRange([0, 14000]);
    }
  }, [searchParams]);

  return (
    <div>
      <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
      <div className="px-2">
        <Slider
          defaultValue={priceRange}
          max={20000}
          step={20}
          value={priceRange}
          onValueChange={handleApply}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
