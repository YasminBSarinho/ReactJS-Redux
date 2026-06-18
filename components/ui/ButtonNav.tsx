"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface propsBtn {
  texto: string;
  href: string;
}

export default function ButtonNav({ texto, href }: propsBtn) {
  const pathname = usePathname();
  const ativo = pathname === href;

  return (
    <Link
      href={href}
      className={
        ativo
          ? "px-3 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] font-semibold transition-all duration-200"
          : "px-3 py-2 rounded-lg border border-transparent text-[var(--text-primary)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:scale-105 transition-all duration-200"
      }
    >
      {texto}
    </Link>
  );
}