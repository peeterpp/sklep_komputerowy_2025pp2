// app/product-list/not-found.tsx
import Link from 'next/link';

export default function ProductNotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-[#222] rounded-lg border border-dashed border-[#444] mt-8">
            <div className="text-5xl mb-4 grayscale opacity-50">📦</div>
            <h2 className="text-2xl font-bold text-white mb-2">Nie znaleziono produktu</h2>
            <p className="text-gray-400 mb-6">Szukany produkt nie istnieje w naszej bazie.</p>
            <Link
                href="/product-list"
                className="text-blue-400 hover:text-blue-300 font-semibold border-b border-blue-400/30 hover:border-blue-300 pb-1 transition-colors"
            >
                Wróć do listy produktów
            </Link>
        </div>
    );
}