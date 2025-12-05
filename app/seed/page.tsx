"use client";

import { seedDatabase } from "@/lib/seed";
import { useState } from "react";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seeded, setSeeded] = useState(false);

  const seedToDB = async () => {
    try {
      setLoading(true);
      setError(null);
      await seedDatabase();
      console.log("Database seeded successfully!");
      setSeeded(true);
    } catch (err) {
      console.error("Failed to seed:", err);
      setError("Failed to seed database. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-2xl">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        onClick={seedToDB}
        disabled={loading}
      >
        {loading ? "Seeding..." : "Seed Database"}
      </button>
      <div className="mt-4 text-center">
        {seeded && (
          <p className="text-green-500">Database seeded successfully!</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
