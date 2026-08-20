"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { RouteLoaderContext } from "@/lib/route-loader-context";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

const DURACION_MIN_MS = 1000;

export default function RouteLoaderProvider({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [cargando, setCargando] = useState(true);
  const [listo, setListo] = useState(false);
  const inicioRef = useRef(null);
  const claveRef = useRef(`${pathname}?${searchParams.toString()}`);
  const timerRef = useRef(null);

  function empezarCarga() {
    inicioRef.current = Date.now();
    setCargando(true);
  }

  function terminarCarga() {
    clearTimeout(timerRef.current);
    const transcurrido = Date.now() - (inicioRef.current ?? Date.now());
    const restante = Math.max(DURACION_MIN_MS - transcurrido, 0);
    timerRef.current = setTimeout(() => {
      setCargando(false);
      setListo(true);
    }, restante);
  }

  useEffect(() => {
    inicioRef.current = Date.now();
    terminarCarga();
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    function alHacerClick(e) {
      const anchor = e.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.origin === window.location.origin && url.pathname + url.search !== claveRef.current) {
          empezarCarga();
        }
      } catch {
        // href inválido (mailto:, tel:, etc.): ignorar
      }
    }

    function alEnviarFormulario(e) {
      if (e.target instanceof HTMLFormElement) empezarCarga();
    }

    document.addEventListener("click", alHacerClick);
    document.addEventListener("submit", alEnviarFormulario);
    return () => {
      document.removeEventListener("click", alHacerClick);
      document.removeEventListener("submit", alEnviarFormulario);
    };
  }, []);

  useEffect(() => {
    const claveNueva = `${pathname}?${searchParams.toString()}`;
    if (claveNueva === claveRef.current) return;
    claveRef.current = claveNueva;
    terminarCarga();
  }, [pathname, searchParams]);

  return (
    <RouteLoaderContext.Provider value={{ empezarCarga, terminarCarga }}>
      <div
        className={`flex min-h-screen flex-col transition-opacity duration-700 ${listo ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
      {cargando && <LoadingOverlay />}
    </RouteLoaderContext.Provider>
  );
}
