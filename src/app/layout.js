import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RouteLoaderProvider from "@/components/providers/RouteLoaderProvider";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Suspense fallback={null}>
          <RouteLoaderProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </RouteLoaderProvider>
        </Suspense>
      </body>
    </html>
  );
}
