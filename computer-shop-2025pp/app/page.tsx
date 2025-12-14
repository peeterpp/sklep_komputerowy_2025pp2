import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
      <main id="home" className="flex flex-col items-center gap-6">
        <Image
          className="logo drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          src="/politechnika-krakowska-logo.svg"
          alt="Logo Politechniki Krakowskiej"
          width={180}
          height={180}
          priority
        />
        <div className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Witajcie na stronie Sklepu Komputerowego 2025 MR!
        </div>
      </main>
    </div>
  );
}