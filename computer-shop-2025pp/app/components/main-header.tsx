// app/components/main-header.tsx
import Link from 'next/link';
import NavLink from './nav-link';
import Image from 'next/image';
import { SignIn, SignOut } from './auth-components';
import { auth } from '@/lib/auth';

export default async function MainHeader() {
    const session = await auth();
    const user = session?.user;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#333] bg-[#111]/80 backdrop-blur-md">
            <div className="flex justify-between items-center px-8 py-4 max-w-[1600px] mx-auto">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-300">
                        <Image
                            src="/politechnika-krakowska-logo.svg"
                            alt="Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold tracking-wider text-white group-hover:text-gray-200 transition-colors">
                        SKLEP 2025
                    </span>
                </Link>

                <nav className="hidden md:flex gap-8 items-center">
                    <NavLink href="/product-list">Produkty</NavLink>
                    <NavLink href="/basket">Koszyk</NavLink>
                    <NavLink href="/about">O nas</NavLink>
                    <NavLink href="/order-history">Historia</NavLink>
                </nav>

                <div className="flex items-center gap-4">
                    {!user ? (
                        <SignIn className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-colors" />
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="hidden lg:block text-sm text-gray-400">
                                {user.name || user.email}
                            </span>
                            <SignOut className="px-4 py-2 text-sm font-bold text-blue-500 border border-blue-500/50 rounded-full hover:bg-blue-900/20 transition-colors" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}