import Image from "next/image";

export default function Gallery({ imagenes, alt }) {
  const [principal, ...miniaturas] = imagenes;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:grid-rows-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2 sm:aspect-auto">
        <Image
          src={principal}
          alt={alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      {miniaturas.map((imagen, i) => (
        <div key={imagen} className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl sm:col-span-1">
          <Image
            src={imagen}
            alt={`${alt} - foto ${i + 2}`}
            fill
            sizes="(min-width: 640px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
