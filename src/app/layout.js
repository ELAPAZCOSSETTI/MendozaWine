import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BodegaPass | Mendoza Wine & Food Match",
  description: "Itinerarios de turismo enológico en Mendoza a tu medida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="w-full bg-linear-to-r from-purple-600 via-pink-500 to-amber-400 bg-clip-text py-6 text-center text-3xl font-bold text-transparent">
          Bienvenido a BodegaPass
        </div>
        {children}
      </body>
    </html>
  );
}
