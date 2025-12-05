"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { addToCart } from "@/lib/db/cart";
import { Product } from "@/lib/db/products";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      router.push("/login"); // Optional: redirect to login
      return;
    }

    setLoading(true);
    try {
      await addToCart(user.uid, product);
      toast.success("Added to cart!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="flex-1"
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
};
