// app/components/product-card.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const imagePath = product.image.replace('public/', '/');

    return (
        <Link
            href={`/product-list/${product.type}/${product.id}`}
            className="group flex flex-col bg-[#222] border border-[#333] rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[#555] transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative w-full aspect-square bg-white/5 p-4 flex items-center justify-center overflow-hidden">
                <Image
                    src={imagePath}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {product.amount === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="text-red-500 font-bold border-2 border-red-500 px-4 py-2 rounded-lg -rotate-12 bg-black/80">
                            WYPRZEDANE
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow p-5 gap-3">
                <div className="flex justify-between items-start gap-2">
                    <h2 className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                        {product.name}
                    </h2>
                </div>

                <div className="mt-auto pt-2 border-t border-[#333]">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{product.type}</span>
                            <span className={`text-xs font-semibold ${product.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {product.amount > 0 ? 'Dostępny' : 'Niedostępny'}
                            </span>
                        </div>
                        <span className="text-2xl font-bold text-white">
                            {product.price.toFixed(2)} <span className="text-sm text-gray-400 font-normal">zł</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}