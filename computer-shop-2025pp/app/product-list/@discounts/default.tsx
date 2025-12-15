// app/product-list/@discounts/default.tsx
import { getAvailableProducts } from "@/lib/products";
import Link from "next/link";

export default function Discounts() {
    const products = getAvailableProducts();
    const promoProduct = products[0];

    if (!promoProduct) return null;

    return (
        <div className="bg-gradient-to-r from-blue-900/40 to-[#222] border border-blue-900/50 rounded-lg p-6 mb-8 text-white shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-blue-400 mb-2">🔥 Okazja Dnia</h2>
                    <p className="text-gray-300">
                        Sprawdź <span className="font-bold text-white">{promoProduct.name}</span> w super cenie!
                    </p>
                </div>
                <Link
                    href={`/product-list/${promoProduct.type}/${promoProduct.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md"
                >
                    Zobacz teraz
                </Link>
            </div>
        </div>
    );
}