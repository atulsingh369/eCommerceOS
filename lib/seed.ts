import { db } from "@/lib/firebase";
import { doc, writeBatch } from "firebase/firestore";
import { products, categories } from "@/lib/mockData";

export const seedDatabase = async () => {
    const batch = writeBatch(db);

    // Seed Products
    products.forEach((product) => {
        const productRef = doc(db, "products", product.id);
        batch.set(productRef, product);
        console.log("Product seeded:", product.name);
    });

    // Seed Categories
    categories.forEach((category) => {
        const categoryRef = doc(db, "categories", category.id);
        batch.set(categoryRef, category);
        console.log("Category seeded:", category.name);
    });

    try {
        await batch.commit();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
