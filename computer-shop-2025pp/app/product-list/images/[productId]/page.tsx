import { getProductById } from '../../../../lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function ImagePage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const id = parseInt(productId);
  const product = getProductById(id);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[80vh]">
         <Image
            src={product.image ? (product.image.startsWith('public/') ? product.image.replace('public/', '/') : (product.image.startsWith('/') ? product.image : `/${product.image}`)) : '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain"
            priority
          />
      </div>
    </div>
  );
}