"use client";

import { useState } from "react";
import Link from "next/link";

const ENLACES = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/itinerario", label: "Itinerario IA" },
];

export default function NavbarMobileMenu() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        className="rounded-full p-2 text-foreground hover:bg-primary-500/10"
      >
        {abierto ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {abierto && (
        <div className="absolute inset-x-0 top-full border-b border-primary-100 bg-background px-4 pb-4 shadow-md">
          <ul className="flex flex-col gap-1 pt-2 text-sm font-medium text-foreground">
            {ENLACES.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-primary-500/10"
                >
                  {enlace.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
