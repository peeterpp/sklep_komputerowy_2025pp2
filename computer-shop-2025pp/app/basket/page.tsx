// app/basket/page.tsx
import { auth } from "@/lib/auth";
import { getCartWithItems, getCartTotal, getAllUsersWithCarts } from '@/lib/actions/cart';
import { SignIn, SignOut } from "../components/auth-components";
import Link from 'next/link';
import RemoveButton from "../components/remove-button";
import CartTransferForm from "../components/cart-transfer-form";

export default async function BasketPage() {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.id) {
        return (
            <div className="p-8 text-center bg-[#222] rounded-lg shadow-lg border border-[#444] mt-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Dostęp tylko dla zalogowanych</h2>
                <p className="text-gray-400 mb-6">Musisz się zalogować, aby zobaczyć swój koszyk.</p>
                <div className="flex justify-center">
                    <SignIn provider="github" className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold" />
                </div>
            </div>
        );
    }

    const cart = await getCartWithItems(user.id);
    const total = await getCartTotal(user.id);
    const allUsers = await getAllUsersWithCarts();

    return (
        <div className="mt-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-[#222] p-4 rounded-lg mb-8 border border-[#444]">
                <div>
                    <p className="text-sm text-gray-400">Zalogowany jako:</p>
                    <p className="font-bold text-white">{user.email || user.name}</p>
                </div>
                <div className="w-auto">
                    <SignOut className="bg-transparent text-blue-500 border border-blue-500/50 px-4 py-2 rounded hover:bg-blue-900/20 transition-colors text-sm" />
                </div>
            </div>

            <div className="bg-[#1a2e3b] p-6 rounded-lg mb-8 border border-blue-900/50">
                <h3 className="text-lg font-bold text-blue-300 mb-4">🔧 Transfer Koszyka (Debug/Lab)</h3>
                <CartTransferForm users={allUsers} currentUserId={user.id} />
            </div>

            <h1 className="text-3xl font-bold mb-6 text-white">Twój Koszyk ({cart?.items.length || 0})</h1>

            {(!cart || cart.items.length === 0) ? (
                <div className="flex flex-col items-center justify-center min-h-[30vh] bg-[#222] rounded-lg shadow-sm border border-[#444] p-8">
                    <div className="text-4xl mb-4 grayscale opacity-50">🛒</div>
                    <h2 className="text-xl font-bold text-gray-200 mb-2">Twój koszyk jest pusty</h2>
                    <Link
                        href="/product-list"
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                        Wróć do sklepu
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="bg-[#222] rounded-lg shadow-sm border border-[#444] overflow-hidden">
                            {cart.items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 p-4 border-b border-[#444] last:border-b-0 hover:bg-[#2a2a2a] transition-colors">
                                    <div className="relative w-24 h-24 flex-shrink-0 bg-white/5 border border-[#444] rounded-md p-1">
                                        <img
                                            src={item.product.image?.replace('public/', '/') || '/placeholder.jpg'}
                                            alt={item.product.name}
                                            className="object-contain w-full h-full mix-blend-screen"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-white text-lg">
                                                    <Link href={`/product-list/produkty/${item.product.id}`} className="hover:text-blue-400 transition-colors">
                                                        {item.product.name}
                                                    </Link>
                                                </h3>
                                                <RemoveButton cartItemId={item.id} />
                                            </div>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Kategoria: {item.product.category.name}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="font-medium text-gray-300">Ilość: {item.amount}</span>
                                            <div className="text-right">
                                                <span className="block font-bold text-xl text-green-400">
                                                    {(item.product.price * item.amount).toFixed(2)} zł
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-[#222] p-6 rounded-lg shadow-sm border border-[#444] sticky top-24">
                            <h2 className="text-xl font-bold mb-4 text-white border-b border-[#444] pb-2">Podsumowanie</h2>
                            <div className="flex justify-between items-center text-xl font-bold text-white pt-2 mb-6">
                                <span>Do zapłaty:</span>
                                <span className="text-blue-500">{total.toFixed(2)} zł</span>
                            </div>
                            <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md">
                                Przejdź do kasy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}