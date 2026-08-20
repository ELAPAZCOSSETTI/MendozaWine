"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLink({ href = "/", onNavigate, className, children }) {
  const pathname = usePathname();

  function alHacerClick(e) {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onNavigate?.();
  }

  return (
    <Link href={href} onClick={alHacerClick} className={className}>
      {children}
    </Link>
  );
}
