
import Link from 'next/link';

export default function NotFound() {
    return (
        <main style={{ padding: '30px', border: '1px solid #ffc107' }}>
            <h3 style={{ color: '#ffc107' }}>Błąd 404 - Strona Historii Zakupów</h3>
            <p>Nie znaleziono żądanej strony w segmencie tras dla **Historii Zakupów**.</p>
            <p>
                <Link href="/order-history" style={{ color: '#ffc107', textDecoration: 'underline' }}>
                    Wróć do Historii Zakupów
                </Link>
            </p>
        </main>
    );
}