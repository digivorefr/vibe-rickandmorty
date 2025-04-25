import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Rick and Morty Explorer",
  description: "A brutalist UI for exploring the Rick and Morty universe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <main className="min-h-screen bg-[#f0f0f0]">
          <nav className="brutalist-container mb-8">
            <h1 className="brutalist-header">Rick and Morty Explorer</h1>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
