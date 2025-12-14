import Link from 'next/link';

export default function NotFound() {
    return (
        <main style={{ padding: '30px', border: '1px solid #dc3545' }}>
            <h3 style={{ color: '#dc3545' }}>Błąd 404 - Strona O Sklepie</h3>
            <p>Nie znaleziono żądanej strony w segmencie tras dla **O Sklepie**.</p>
            <p>
                <Link href="/about" style={{ color: '#dc3545', textDecoration: 'underline' }}>
                    Wróć do Strony O Sklepie
                </Link>
            </p>
        </main>
    );
}