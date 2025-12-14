
import Link from 'next/link';

export default function NotFound() {
    return (
        <main style={{ padding: '30px', border: '1px solid #28a745' }}>
            <h3 style={{ color: '#28a745' }}>Błąd 404 - Strona Koszyka</h3>
            <p>Nie znaleziono żądanej strony w segmencie tras dla **Koszyka**.</p>
            <p>
                <Link href="/basket" style={{ color: '#28a745', textDecoration: 'underline' }}>
                    Wróć do Koszyka
                </Link>
            </p>
        </main>
    );
}