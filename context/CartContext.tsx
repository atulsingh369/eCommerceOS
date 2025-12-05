"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  CartItem,
  getCart,
  addToCart as apiAddToCart,
  updateCartQuantity as apiUpdateCartQuantity,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from "@/lib/db/cart";
import { Product } from "@/lib/db/products";
import toast from "react-hot-toast";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync cart when user changes
  useEffect(() => {
    let mounted = true;

    const fetchCart = async () => {
      if (!user) {
        setCart([]);
        return;
      }

      try {
        setLoading(true);
        const items = await getCart(user.uid);
        if (mounted) setCart(items);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCart();

    return () => {
      mounted = false;
    };
  }, [user]);

  const addToCart = async (product: Product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    // Optimistic update
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    try {
      await apiAddToCart(user.uid, product);
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
      // Revert on error - simplified for now, usually would refetch
      const items = await getCart(user.uid);
      setCart(items);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    // Optimistic update
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });

    try {
      await apiUpdateCartQuantity(user.uid, productId, quantity);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart");
      const items = await getCart(user.uid);
      setCart(items);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    setCart((prev) => prev.filter((item) => item.id !== productId));

    try {
      await apiRemoveFromCart(user.uid, productId);
      toast.success("Removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
      const items = await getCart(user.uid);
      setCart(items);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    setCart([]);
    try {
      await apiClearCart(user.uid);
      toast.success("Cart cleared");
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart");
      const items = await getCart(user.uid);
      setCart(items);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
