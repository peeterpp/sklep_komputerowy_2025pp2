// app/product-list/images/[productId]/page.tsx
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ImagePage(props: {
    params: Promise<{ productId: string }>;
}) {
    const params = await props.params;
    const productId = parseInt(params.productId);
    const product = getProductById(productId);

    if (!product) {
        notFound();
    }

    const imagePath = product.image.replace('public/', '/');

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-[#222]">
            <h1 className="text-3xl font-bold mb-8 text-white">{product.name}</h1>

            <div className="relative w-full max-w-4xl aspect-video bg-[#1a1a1a] border border-[#444] rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                    src={imagePath}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <div className="mt-8">
                <Link
                    href={`/product-list/produkty/${product.id}`}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Wróć do produktu
                </Link>
            </div>
        </div>
    );
}