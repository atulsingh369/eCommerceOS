import { Product } from "./db/products";

export interface CartItem extends Product {
    quantity: number;
}

interface CartTotals {
    subtotal: number;
    tax: number;
    total: number;
    discountAmount: number;
}

interface CalculationOptions {
    taxRate?: number;
    discountDetails?: {
        type: 'fixed' | 'percentage';
        value: number;
    }
}

export function calculateCartTotals(items: CartItem[], options: CalculationOptions = {}): CartTotals {
    const { taxRate = 0.08, discountDetails } = options;

    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    let discountAmount = 0;
    if (discountDetails) {
        if (discountDetails.type === 'fixed') {
            discountAmount = discountDetails.value;
        } else if (discountDetails.type === 'percentage') {
            discountAmount = subtotal * (discountDetails.value / 100);
        }
    }

    // Ensure discount doesn't exceed subtotal
    discountAmount = Math.min(discountAmount, subtotal);

    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * taxRate;
    const total = taxableAmount + tax;

    return {
        subtotal,
        tax,
        total,
        discountAmount
    };
}
