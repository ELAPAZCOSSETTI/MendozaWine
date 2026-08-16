import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-primary-100 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-primary-700 dark:text-primary-300">
          BodegaPass
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-foreground">
          <li>
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/buscar" className="hover:text-primary-600 dark:hover:text-primary-300">
              Buscar
            </Link>
          </li>
          <li>
            <Link href="/itinerario" className="hover:text-primary-600 dark:hover:text-primary-300">
              Itinerario IA
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
