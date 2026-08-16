import { Suspense } from "react";
import SearchBar from "@/components/search/SearchBar";
import CategoryPills from "@/components/search/CategoryPills";
import ListingGrid from "@/components/listings/ListingGrid";
import { getFeaturedListings } from "@/lib/repositories/listings";

export default async function Home() {
  const destacados = await getFeaturedListings(8);

  return (
    <main>
      <section className="bg-primary-900 px-4 py-16 text-cream-50 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Descubrí Mendoza a través de sus bodegas
          </h1>
          <p className="text-primary-100/90 sm:text-lg">
            Bodegas, restaurantes y experiencias en Luján de Cuyo, Valle de Uco,
            Maipú y la Ciudad de Mendoza.
          </p>
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Destacados</h2>
          <Suspense fallback={null}>
            <CategoryPills />
          </Suspense>
        </div>
        <ListingGrid listings={destacados} />
      </section>
    </main>
  );
}
