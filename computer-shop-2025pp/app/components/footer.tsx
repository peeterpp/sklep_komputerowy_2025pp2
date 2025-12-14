export default function Footer() {
    return (
        <footer className="w-full border-t border-[#333] bg-[#111] py-8 mt-auto text-center text-sm text-gray-500">
            <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>
                    &copy; 2025 Sklep Komputerowy MR. Wszelkie prawa zastrzeżone.
                </p>
                <p>
                    Projekt i realizacja: <span className="text-gray-300">Student PK</span>
                </p>
            </div>
        </footer>
    );
}