export default function LoadingOverlay() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <svg viewBox="0 0 50 50" className="h-14 w-14 animate-spin motion-reduce:animate-none">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" className="stroke-primary-100" />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90 125.6"
          className="stroke-accent-500"
        />
      </svg>
    </div>
  );
}
