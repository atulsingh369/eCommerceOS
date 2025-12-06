"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-10 pb-12">
      <div className="container mx-auto px-6 py-4 pt-8 flex justify-between items-center flex-col md:flex-row gap-6">
        <Link
          href="https://atulsingh369.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="flex order-2 md:order-1 items-center gap-3 text-2xl font-bold font-sans tracking-tighter group"
        >
          <motion.div
            initial={{
              filter:
                "brightness(100%) drop-shadow(0 0 0px rgba(61,255,157,0))",
              scale: 1,
            }}
            animate={{
              filter: [
                "brightness(100%) drop-shadow(0 0 0px rgba(61,255,157,0))",
                "brightness(130%) drop-shadow(0 0 10px rgba(61,255,157,0.6))",
                "brightness(100%) drop-shadow(0 0 0px rgba(61,255,157,0))",
              ],
              scale: [1, 1.035, 1], // Micro pulse
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 5,
              repeatType: "loop",
            }}
            className="flex flex-col items-center text-2xl font-bold font-sans tracking-tighter group"
          >
            <img
              src="/devstudios-logo.png"
              alt="DevStudios Logo"
              className="2xl:h-24 2xl:w-24 lg:h-24 lg:w-24 h-28 w-28 transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_6px_rgba(61,255,157,0.6)]"
            />
          </motion.div>
        </Link>

        <div className="order-1 md:order-2 flex gap-6 text-sm text-muted-foreground flex-wrap justify-start">
          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-foreground transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-foreground transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground transition">
            Contact
          </Link>
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground">
        © {new Date().getFullYear()} DevStudios. All rights reserved.
        <br />
        This ecommerce platform is owned and operated by DevStudios.
        Unauthorized use, reproduction, or distribution is strictly prohibited.
      </div>
    </footer>
  );
}
