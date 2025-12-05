import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-6">
        About This Prototype
      </h1>
      <p className="text-xl text-muted-foreground mb-8 text-left md:text-center leading-relaxed">
        This e-commerce website is built for demonstration purposes only. It is
        a high-fidelity prototype created by
        <span className="font-semibold text-foreground">
          {" "}
          DevStudios / Atul
        </span>
        .
      </p>

      <div className="text-left bg-muted p-8 rounded-xl space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Next.js 14 (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Shadcn UI (Component Library)</li>
          <li>Ready for integration with Firebase (Auth, Firestore)</li>
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/contact">
          <Button size="lg">Contact Us</Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline">
            Back to Home
          </Button>
        </Link>
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} DevStudios. All rights reserved. Do not
        deploy commercially without permission.
      </p>
    </div>
  );
}
