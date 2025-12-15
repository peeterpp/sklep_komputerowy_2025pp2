"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById, Product } from "@/lib/products";

export default function InterceptedImageModal({ params }: { params: Promise<{ productId: string }> }) {
  const router = useRouter();
  const resolved = use(params);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const id = parseInt(resolved.productId);
    setProduct(getProductById(id));
  }, [resolved.productId]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={() => router.back()}
    >
      <div
        className="relative bg-[#111] p-2 rounded-xl max-w-4xl w-full h-[80vh] shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-10 bg-[#00d4ff] text-[#111] hover:bg-[#00aacc] rounded-full w-10 h-10 flex items-center justify-center font-bold transition"
        >
          ✕
        </button>

        <div className="relative w-full h-full bg-[#1a1a1a] rounded-lg">
          <Image
            src={
              product.image
                ? product.image.startsWith("public/")
                  ? product.image.replace("public/", "/")
                  : product.image.startsWith("/")
                  ? product.image
                  : `/${product.image}`
                : "/placeholder.png"
            }
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[#000]/60 p-4 text-center backdrop-blur-md">
          <h3 className="text-xl font-bold text-[#eee]">{product.name}</h3>
        </div>
      </div>
    </div>
  );
}
