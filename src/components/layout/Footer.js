export default function Footer() {
  return (
    <footer className="mt-auto border-t border-primary-100 bg-primary-900 text-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-bold">BodegaPass</span>
          <p className="text-primary-100/80">
            Turismo enológico en Mendoza: bodegas, restaurantes y experiencias en
            Luján de Cuyo, Valle de Uco, Maipú y Ciudad.
          </p>
        </div>
        <p className="mt-6 text-xs text-primary-100/60">
          Los itinerarios generados en la sección &ldquo;Itinerario IA&rdquo; son creados por un
          modelo de lenguaje y pueden contener imprecisiones — verificá horarios y
          disponibilidad antes de viajar.
        </p>
        <p className="mt-2 text-xs text-primary-100/60">
          © {new Date().getFullYear()} BodegaPass. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
