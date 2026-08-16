const VARIANTES = {
  tag: "bg-olive-500/15 text-foreground",
  precio: "bg-accent-500/20 text-foreground",
  rating: "bg-primary-500/15 text-foreground",
};

export default function Badge({ label, variant = "tag" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${VARIANTES[variant] ?? VARIANTES.tag}`}
    >
      {label}
    </span>
  );
}
