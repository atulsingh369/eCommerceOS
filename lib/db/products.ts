import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    QueryConstraint
} from "firebase/firestore";

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    description: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: string;
    rating: number;
    reviews: number;
    image: string;
    images: string[];
    description: string;
    features: string[];
    isNew: boolean;
}

export const getProducts = async (userInfo?: { category?: string; sort?: string, featured?: boolean }) => {
    try {
        const q = collection(db, "products");
        const constraints: QueryConstraint[] = [];

        if (userInfo?.category) {
            constraints.push(where("category", "==", userInfo.category));
        }

        if (userInfo?.featured) {
            constraints.push(where("isNew", "==", true));
            constraints.push(limit(3));
        }

        // Simple sort mapping
        if (userInfo?.sort === 'price_asc') {
            constraints.push(orderBy("price", "asc"));
        } else if (userInfo?.sort === 'price_desc') {
            constraints.push(orderBy("price", "desc"));
        }

        const finalQuery = query(q, ...constraints);
        const querySnapshot = await getDocs(finalQuery);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                price: Number(data.price),
                category: data.category,
                rating: Number(data.rating),
                reviews: Number(data.reviews),
                image: data.image,
                images: data.images || [],
                description: data.description,
                features: data.features || [],
                isNew: !!data.isNew,
            } as Product;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductById = async (id: string) => {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                name: data.name,
                slug: data.slug,
                price: Number(data.price),
                category: data.category,
                rating: Number(data.rating),
                reviews: Number(data.reviews),
                image: data.image,
                images: data.images || [],
                description: data.description,
                features: data.features || [],
                isNew: !!data.isNew,
            } as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting product:", error);
        return null;
    }
}

export const getCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                image: data.image,
                description: data.description,
            } as Category;
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export const searchProducts = async (queryText: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                price: Number(data.price),
                category: data.category,
                rating: Number(data.rating),
                reviews: Number(data.reviews),
                image: data.image,
                images: data.images || [],
                description: data.description,
                features: data.features || [],
                isNew: !!data.isNew,
            } as Product;
        });

        const lowerQuery = queryText.toLowerCase();
        return allProducts.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        ).slice(0, 5); // Limit relative results
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
}
