import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function InterceptedImagePage(props: {
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
        <div className="relative w-full h-full flex flex-col items-center bg-[#222] p-6 rounded-lg border border-[#444] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-white">{product.name}</h2>
            <div className="relative w-full h-[500px] bg-white/5 rounded-md overflow-hidden">
                <Image
                    src={imagePath}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </div>
            <p className="mt-4 text-gray-400 text-sm">Kliknij poza obszar, aby zamknąć.</p>
        </div>
    );
}