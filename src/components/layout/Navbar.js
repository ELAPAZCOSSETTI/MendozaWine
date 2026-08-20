import Link from "next/link";
import HomeLink from "@/components/layout/HomeLink";
import NavbarMobileMenu from "@/components/layout/NavbarMobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-primary-100 bg-background/95 backdrop-blur">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <HomeLink className="text-xl font-bold text-primary-700 dark:text-primary-300">
          BodegaPass
        </HomeLink>
        <ul className="hidden items-center gap-6 text-sm font-medium text-foreground sm:flex">
          <li>
            <HomeLink className="hover:text-primary-600 dark:hover:text-primary-300">
              Inicio
            </HomeLink>
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
        <NavbarMobileMenu />
      </nav>
    </header>
  );
}
