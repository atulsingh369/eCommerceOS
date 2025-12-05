"use client";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/db/products";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface BuyNowButtonProps {
  product: Product;
}

export const BuyNowButton = ({ product }: BuyNowButtonProps) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login to purchase");
      router.push("/login");
      return;
    }

    await addToCart(product);
    router.push("/checkout");
  };

  return (
    <Button variant="secondary" size="lg" onClick={handleBuyNow}>
      Buy Now
    </Button>
  );
};
