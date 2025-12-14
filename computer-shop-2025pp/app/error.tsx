// app/error.tsx
'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#222] p-8 rounded-lg border border-blue-900/30 mt-8">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Coś poszło nie tak!</h2>
            <p className="text-gray-400 mb-8 text-center max-w-lg">
                Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wróć później.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Spróbuj ponownie
                </button>
            </div>
        </div>
    );
}