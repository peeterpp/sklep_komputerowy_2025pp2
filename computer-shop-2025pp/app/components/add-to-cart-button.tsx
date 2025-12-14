// app/components/add-to-cart-button.tsx
"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId, disabled }: { productId: number, disabled?: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAddToCart = () => {
        startTransition(async () => {
            const result = await addToCart(productId);
            if (result.error) {

                alert("Musisz być zalogowany, aby dodać produkt!");
                router.push("/basket");
            } else {
                alert("Produkt dodany do koszyka!");
                router.refresh();
            }
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={disabled || isPending}
            className="w-full lg:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? 'Dodawanie...' : 'Dodaj do koszyka'}
        </button>
    );
}