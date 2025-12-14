// app/components/nav-link.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const path = usePathname();
    const isActive = path.startsWith(href);

    return (
        <Link
            href={href}
            className={`
                transition-colors duration-300 font-medium text-lg
                ${isActive
                    ? 'text-blue-500 font-bold drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }
            `}
        >
            {children}
        </Link>
    );
}