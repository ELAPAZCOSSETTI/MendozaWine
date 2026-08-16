import { Suspense } from "react";
import CategoryPills from "@/components/search/CategoryPills";
import ListingGrid from "@/components/listings/ListingGrid";
import FilterBar from "@/components/filters/FilterBar";
import { getListings } from "@/lib/repositories/listings";

function aArray(valor) {
  if (!valor) return [];
  return Array.isArray(valor) ? valor : [valor];
}

export default async function Buscar({ searchParams }) {
  const params = await searchParams;
  const tipo = params.tipo || "";
  const zona = params.zona || "";
  const precioMax = params.precioMax || "";
  const tags = aArray(params.tags);

  const { items, total } = await getListings({
    tipo: tipo || undefined,
    zona: zona || undefined,
    tags,
    precioMax: precioMax || undefined,
    pageSize: 24,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Buscar</h1>
          <p className="text-sm text-stone-500">
            {total} resultado{total === 1 ? "" : "s"}
          </p>
        </div>
        <Suspense fallback={null}>
          <CategoryPills />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <FilterBar filtrosActuales={{ tipo, zona, precioMax, tags }} />
        </aside>
        <ListingGrid listings={items} />
      </div>
    </main>
  );
}
