import ListingCard from "@/components/listings/ListingCard";

export default function ListingGrid({ listings }) {
  if (listings.length === 0) {
    return (
      <p className="py-16 text-center text-stone-500">
        No encontramos resultados con estos filtros. Probá ajustar la zona, el
        tipo de experiencia o el precio.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
