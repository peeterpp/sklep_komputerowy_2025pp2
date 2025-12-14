import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import MainHeader from "./components/main-header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sklep Komputerowy 2025PP",
  description: "Sklep komputerowy - projekt Lab",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="
        font-sans 
        m-0 
        pt-0 
        pb-[200px] 
        px-20
        bg-gradient-to-r from-[#111111] to-[#333333]
        text-[#eee]
      ">
        <MainHeader />

        <main className="p-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}