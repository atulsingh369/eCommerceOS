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

export const getProducts = async (userInfo?: {
    category?: string;
    sort?: string;
    featured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
}) => {
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

        if (userInfo?.minPrice !== undefined) {
            constraints.push(where("price", ">=", Number(userInfo.minPrice)));
        }

        if (userInfo?.maxPrice !== undefined) {
            constraints.push(where("price", "<=", Number(userInfo.maxPrice)));
        }


        // Simple sort mapping - Note: Firestore requires the field in equality filter (category) to be first in orderBy, or use composite index.
        // For simplicity with multiple filters, we might do client side sorting/filtering if constraints conflict or need indexes.
        // But price range + price sort works fine if price is the inequality field. 
        if (userInfo?.sort === 'price_asc') {
            constraints.push(orderBy("price", "asc"));
        } else if (userInfo?.sort === 'price_desc') {
            constraints.push(orderBy("price", "desc"));
        }

        const finalQuery = query(q, ...constraints);
        const querySnapshot = await getDocs(finalQuery);

        let results = querySnapshot.docs.map(doc => {
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

        if (userInfo?.search) {
            const lowerQuery = userInfo.search.toLowerCase();
            results = results.filter(product =>
                product.name.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery)
            );
        }

        // Manual Pagination (Client-side style since we don't have total count easily with constraints)
        // ideally we would use limit/startAfter in firestore but for filter flexibility we do it here
        const page = userInfo?.page || 1;
        const limitCount = userInfo?.limit || 100; // Default showing many if not specified

        if (userInfo?.limit) {
            const start = (page - 1) * limitCount;
            results = results.slice(start, start + limitCount);
        }

        return results;
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
                name: data.name ?? "",
                slug: data.slug ?? "",
                price: Number(data.price ?? 0),
                category: data.category ?? "",
                rating: Number(data.rating ?? 0),
                reviews: Number(data.reviews ?? 0),
                image: data.image ?? "",
                images: data.images ?? [],
                description: data.description ?? "",
                features: data.features ?? [],
                isNew: !!data.isNew,
            } as Product;
        });

        const lowerQuery = (queryText ?? "").toLowerCase();

        const filtered = allProducts.filter(product => {
            return (
                product.name.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery)
            );
        });

        const ranked = filtered.sort((a, b) => {
            const aScore =
                (a.name.toLowerCase().startsWith(lowerQuery) ? 3 : 0) +
                (a.name.toLowerCase().includes(lowerQuery) ? 2 : 0) +
                (a.category.toLowerCase().includes(lowerQuery) ? 1 : 0);

            const bScore =
                (b.name.toLowerCase().startsWith(lowerQuery) ? 3 : 0) +
                (b.name.toLowerCase().includes(lowerQuery) ? 2 : 0) +
                (b.category.toLowerCase().includes(lowerQuery) ? 1 : 0);

            return bScore - aScore;
        });

        console.log("RANKED", ranked);
        return ranked.slice(0, 8);
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};