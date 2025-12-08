"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext"; // Added import for useAuth
import { usePathname } from "next/navigation"; // Added import
import { useCart } from "@/context/CartContext"; // Added import

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                CommerceOS
              </span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/categories", label: "Categories" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-foreground/80 ${
                    isActive(link.href)
                      ? "text-primary font-bold"
                      : "text-foreground/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  href="/orders"
                  className={`transition-colors hover:text-foreground/80 flex items-center gap-1.5 ${
                    isActive("/orders")
                      ? "text-primary font-bold"
                      : "text-foreground/60"
                  }`}
                >
                  Orders
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-[200px] lg:w-[300px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(
                        target.value
                      )}`;
                    }
                  }
                }}
              />
            </div>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <div className="hidden md:flex gap-2">
              {user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden lg:inline-block">
                      {user.displayName?.split(" ")[0] ||
                        user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border z-50">
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            My Profile
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            My Orders
                          </Link>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              signOut();
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden border-t z-100 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 p-4 space-y-4 bg-background"
        >
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                if (target.value.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(
                    target.value
                  )}`;
                  setIsMenuOpen(false);
                }
              }
            }}
          />
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            {user && (
              <Link
                href="/orders"
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {user ? (
              <Link
                href="/profile"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
