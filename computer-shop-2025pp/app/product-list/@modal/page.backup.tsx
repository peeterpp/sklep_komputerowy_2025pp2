import { notFound } from 'next/navigation';

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
import Link from 'next/link';


const slugToProductType = (slug: string) => slug.replace(/-/g, ' ');

interface ProductPageProps {
    params: { slug?: string[] };
    searchParams: { sort?: 'name' | 'newest'; available?: 'true' | 'false' };
}



function ProductDetails({ product }: { product: Product }) {

    const productTypeSlug = product.type.replace(/\s+/g, '-');
    const imageLink = `/product-list/${productTypeSlug}/${product.id}/image`;

    return (
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
            <div className="lg:w-1/3">
                <h1 className="text-3xl font-bold mb-4 lg:hidden">{product.name}</h1>
                <div className="relative w-full h-96 border rounded-lg overflow-hidden">

                    <Link href={imageLink} scroll={false}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                        />
                    </Link>
                </div>
            </div>

            <div className="lg:w-2/3">
                <h1 className="text-3xl font-bold mb-2 hidden lg:block">{product.name}</h1>
                <p className="text-2xl font-extrabold text-red-600 my-4">
                    Cena: {product.price.toFixed(2)} zł
                </p>

                <div className="mb-6">
                    <p className="text-gray-600">Kod: <span className="font-semibold">{product.code}</span></p>
                    <p className="text-gray-600">Typ: <span className="font-semibold">{product.type}</span></p>
                    <p className="text-gray-600">Dostępność:
                        <span className={`font-semibold ${product.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.amount > 0 ? `W magazynie (${product.amount} szt.)` : 'Chwilowo brak'}
                        </span>
                    </p>
                </div>

                <button
                    className="w-full lg:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    disabled={product.amount === 0}
                >
                    {product.amount > 0 ? 'Dodaj do koszyka' : 'Powiadom o dostępności'}
                </button>

                <h2 className="text-xl font-bold mt-8 mb-3">Opis Produktu</h2>
                <p className="text-gray-700">{product.description}</p>
            </div>
        </div>
    );
}




function ProductList({ products, category, searchParams }: { products: Product[], category?: string, searchParams: ProductPageProps['searchParams'] }) {


    const categorySlug = category ? `/${category}` : '';
    const isAvailable = searchParams.available === 'true';

    return (
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                {category ? `Produkty: ${slugToProductType(category).toUpperCase()}` : 'Wszystkie Produkty'}
            </h1>

            <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="flex space-x-4 items-center">
                    <p className="font-semibold">Sortuj:</p>


                    <Link
                        href={`/product-list${categorySlug}?sort=name${isAvailable ? '&available=true' : ''}`}
                        className={`text-sm py-1 px-3 rounded-full ${searchParams.sort === 'name' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                    >
                        Alfabetycznie
                    </Link>


                    <Link
                        href={`/product-list${categorySlug}?sort=newest${isAvailable ? '&available=true' : ''}`}
                        className={`text-sm py-1 px-3 rounded-full ${searchParams.sort === 'newest' || !searchParams.sort ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                    >
                        Najnowsze
                    </Link>
                </div>


                <Link
                    href={`/product-list${categorySlug}?sort=${searchParams.sort || 'newest'}${isAvailable ? '' : '&available=true'}`}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${isAvailable ? 'bg-green-100' : 'bg-white hover:bg-gray-100'}`}
                >
                    <input
                        type="checkbox"
                        checked={isAvailable}
                        readOnly
                        className="h-5 w-5 text-red-600 rounded"
                    />
                    <span className="text-gray-700">Tylko dostępne</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {products.length === 0 && (
                <p className="text-center text-xl text-gray-500 mt-10">Brak produktów do wyświetlenia w tej kategorii/przy tych filtrach.</p>
            )}
        </div>
    );
}



export default async function ProductListPage({ params, searchParams }: ProductPageProps) {
    const slug = params.slug || [];
    let products: Product[] = [];
    const isAvailable = searchParams.available === 'true';
    const sort = searchParams.sort || 'newest';


    if (slug.length === 2) {
        const categorySlug = slug[0];
        const productId = parseInt(slug[1]);

        if (isNaN(productId)) {

            notFound();
        }

        const product = getProductById(productId);


        if (!product || slugToProductType(product.type) !== categorySlug) {
            notFound(); // Zadanie 7.1
        }

        return <ProductDetails product={product} />;
    }


    if (slug.length === 1) {
        const categorySlug = slug[0];
        const categoryType = slugToProductType(categorySlug) as Product['type'];

        let filteredProducts = getProductsByCategory(categoryType);


        if (isAvailable) {
            filteredProducts = filteredProducts.filter(p => p.amount > 0);
        }


        if (sort === 'name') {
            products = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            products = [...filteredProducts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        if (getAllProducts().filter(p => p.type === categoryType).length === 0 && filteredProducts.length === 0) {

        }

        return <ProductList products={products} category={categorySlug} searchParams={searchParams} />;
    }


    let allProducts = getAllProducts();

    if (isAvailable) {
        allProducts = getAvailableProducts();
    }


    if (sort === 'name') {
        products = getProductsAlphabetically();
        if (isAvailable) { products = products.filter(p => p.amount > 0); }
    } else {
        products = getProductsByNewest();
        if (isAvailable) { products = products.filter(p => p.amount > 0); }
    }

    return <ProductList products={products} searchParams={searchParams} />;
}