// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-[#222] text-[#eee] p-8 rounded-lg border border-[#444] mt-8">
            <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-6">Nie znaleziono strony</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
            </p>
            <Link
                href="/"
                className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
            >
                Wróć na stronę główną
            </Link>
        </div>
    );
}