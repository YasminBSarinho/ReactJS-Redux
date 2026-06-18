import BtnTexto from "../ui/ButtonNav";

import { Ticket } from "lucide-react";

export default function BarNav() {

  return (
    <div className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegação Principal"
      >
        <div className="flex items-center gap-3 text-lg font-bold tracking-tight text-[var(--text-primary)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-md">
            <Ticket/>
          </span>

          <span>DBC Desk</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <BtnTexto href="/dashboard" texto="Dashboard" />
          <BtnTexto href="/chamados" texto="Chamados" />
          <BtnTexto href="/cadastroChamado" texto="Abrir Chamado" />
        </div>

        
      </nav>
    </div>
  );
}