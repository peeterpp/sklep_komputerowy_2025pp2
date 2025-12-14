// app/product-list/[[...slug]]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';

import {
    getAllProducts,
    getProductsAlphabetically,
    getProductsByNewest,
    getProductsByCategory,
    getProductById,
    getAvailableProducts,
    Product
} from '@/lib/products';
import ProductCard from '../../components/product-card';
import AddToCartButton from '../../components/add-to-cart-button';

const slugToProductType = (slug: string) => decodeURIComponent(slug).replace(/-/g, ' ');

function ProductDetails({ product }: { product: Product }) {
    const imageLink = `/product-list/images/${product.id}`;
    const imagePath = product.image.replace('public/', '/');

    return (
        <div className="flex flex-col lg:flex-row gap-8 bg-[#222] p-8 rounded-lg shadow-lg border border-[#444]">
            <div className="lg:w-1/3">
                <h1 className="text-3xl font-bold mb-4 lg:hidden text-white">{product.name}</h1>
                <div className="relative w-full h-96 border border-[#444] bg-white/5 rounded-lg overflow-hidden group">
                    <Link
                        href={imageLink}
                        scroll={false}
                        className="block w-full h-full"
                    >
                        <img
                            src={imagePath}
                            alt={product.name}
                            className="object-contain w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold bg-black/70 px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                                Powiększ
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="lg:w-2/3">
                <h1 className="text-4xl font-bold mb-2 hidden lg:block text-white">{product.name}</h1>
                <p className="text-3xl font-extrabold text-blue-500 my-6">
                    {product.price.toFixed(2)} zł
                </p>

                <div className="mb-8 space-y-3 bg-[#2a2a2a] p-4 rounded-lg border border-[#333]">
                    <p className="text-gray-400">Kod produktu: <span className="font-mono text-gray-200">{product.code}</span></p>
                    <p className="text-gray-400">Typ: <span className="font-medium text-gray-200">{product.type}</span></p>
                    <p className="text-gray-400">Dostępność:
                        <span className={`font-bold ml-2 ${product.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {product.amount > 0 ? `W magazynie (${product.amount} szt.)` : 'Chwilowo brak'}
                        </span>
                    </p>
                </div>

                {product.amount > 0 ? (
                    <div className="mb-8">
                        <AddToCartButton productId={product.id} />
                    </div>
                ) : (
                    <button
                        className="w-full lg:w-auto bg-gray-600 text-gray-300 font-bold py-3 px-8 rounded-lg cursor-not-allowed mb-8"
                        disabled
                    >
                        Powiadom o dostępności
                    </button>
                )}

                <h2 className="text-xl font-bold mt-8 mb-4 text-white border-b border-[#444] pb-2">Opis Produktu</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
            </div>
        </div>
    );
}

function ProductList({ products, category, isAvailable, sort }:
    { products: Product[], category?: string, isAvailable: boolean, sort: 'name' | 'newest' }) {

    const categorySlug = category ? `/${category}` : '';

    const categories = [
        { slug: 'procesor', label: 'Procesory' },
        { slug: 'karta-graficzna', label: 'Karty Graficzne' },
        { slug: 'pamięć-ram', label: 'Pamięć RAM' },
        { slug: 'dysk', label: 'Dyski' },
    ];

    return (
        <div className="w-full">
            <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">
                {category ? `Kategoria: ${slugToProductType(category).toUpperCase()}` : 'Wszystkie Produkty'}
            </h1>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-[#222] border border-[#444] rounded-lg gap-4">
                <div className="flex space-x-4 items-center flex-wrap">
                    <p className="font-semibold text-gray-400">Sortuj:</p>

                    <Link
                        href={`/product-list${categorySlug}?sort=name${isAvailable ? '&available=true' : ''}`}
                        className={`text-sm py-2 px-4 rounded-full transition-all ${sort === 'name' ? 'bg-blue-600 text-white shadow-lg' : 'bg-[#333] text-gray-300 hover:bg-[#444] border border-[#444]'}`}
                    >
                        Alfabetycznie
                    </Link>

                    <Link
                        href={`/product-list${categorySlug}?sort=newest${isAvailable ? '&available=true' : ''}`}
                        className={`text-sm py-2 px-4 rounded-full transition-all ${sort === 'newest' ? 'bg-blue-600 text-white shadow-lg' : 'bg-[#333] text-gray-300 hover:bg-[#444] border border-[#444]'}`}
                    >
                        Najnowsze
                    </Link>
                </div>

                <Link
                    href={`/product-list${categorySlug}?sort=${sort}${isAvailable ? '' : '&available=true'}`}
                    className={`flex items-center space-x-2 cursor-pointer p-2 px-3 rounded border transition-colors ${isAvailable ? 'bg-green-900/30 border-green-700' : 'bg-[#333] border-[#444] hover:bg-[#444]'}`}
                >
                    <div className={`w-5 h-5 border rounded flex items-center justify-center ${isAvailable ? 'bg-green-600 border-green-600' : 'border-gray-500 bg-[#222]'}`}>
                        {isAvailable && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`font-medium ${isAvailable ? 'text-green-400' : 'text-gray-300'}`}>Tylko dostępne</span>
                </Link>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-300">Wybierz kategorię:</h3>
                <div className="flex flex-wrap gap-3">

                    <Link
                        href={`/product-list?sort=${sort}${isAvailable ? '&available=true' : ''}`}
                        className={`px-4 py-2 rounded-lg border transition-all ${!category ? 'bg-white text-black font-bold border-white shadow-md' : 'bg-[#222] text-gray-400 border-[#444] hover:bg-[#333] hover:text-white'}`}
                    >
                        Wszystkie
                    </Link>

                    {categories.map((cat) => {
                        const isActive = category === cat.slug;
                        return (
                            <Link
                                key={cat.slug}
                                href={`/product-list/${cat.slug}?sort=${sort}${isAvailable ? '&available=true' : ''}`}
                                className={`px-4 py-2 rounded-lg border transition-all ${isActive ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold' : 'bg-[#222] text-gray-400 border-[#444] hover:bg-[#333] hover:text-blue-400 hover:border-blue-900'}`}
                            >
                                {cat.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {products.length === 0 && (
                <div className="text-center py-16 bg-[#222] rounded-lg border border-dashed border-[#444]">
                    <p className="text-xl text-gray-400">Brak produktów spełniających kryteria.</p>
                </div>
            )}
        </div>
    );
}

export default async function ProductListPage(props: {
    params: Promise<{ slug?: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const slug = params.slug || [];
    const isAvailable = searchParams.available === 'true';
    const sort = (searchParams.sort as 'name' | 'newest') || 'newest';

    let products: Product[] = [];

    if (slug.length === 2) {
        const categorySlug = slug[0];
        const productId = parseInt(slug[1]);
        if (isNaN(productId)) notFound();
        const product = getProductById(productId);
        if (!product || product.type !== slugToProductType(categorySlug)) notFound();
        return <ProductDetails product={product} />;
    }

    if (slug.length === 1) {
        const categorySlug = slug[0];
        const categoryType = slugToProductType(categorySlug) as Product['type'];
        let filteredProducts = getProductsByCategory(categoryType);
        if (isAvailable) filteredProducts = filteredProducts.filter(p => p.amount > 0);
        if (sort === 'name') {
            products = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            products = [...filteredProducts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return <ProductList products={products} category={categorySlug} isAvailable={isAvailable} sort={sort} />;
    }

    if (slug.length === 0) {
        let allProducts = getAllProducts();
        if (isAvailable) allProducts = getAvailableProducts();
        if (sort === 'name') {
            products = [...allProducts].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            products = [...allProducts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return <ProductList products={products} isAvailable={isAvailable} sort={sort} />;
    }

    notFound();
}