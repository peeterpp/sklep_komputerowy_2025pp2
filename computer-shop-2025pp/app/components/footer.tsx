export default function Footer() {
  return (
    <footer className="py-5 text-center text-[#eee] bg-[#111] border-t border-[#00d4ff]">
      <p>Autor: Piotr Poliński</p>
      <p>2025</p>
      <p>
        <a 
          href="https://pk.edu.pl" 
          className="text-[#00d4ff] hover:underline transition"
        >
          Politechnika Krakowska
        </a>
      </p>
    </footer>
  );
}