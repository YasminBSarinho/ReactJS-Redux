import Link from "next/link";

type CardChamadoProps = {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;
  solicitante: string;
  createdAt: string;
};

export default function CardChamado({
  id,
  titulo,
  descricao,
  prioridade,
  status,
  solicitante,
  createdAt,
}: CardChamadoProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {titulo}
        </h2>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        {descricao}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs">
          Prioridade: {prioridade}
        </span>

        <span className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs">
          {solicitante}
        </span>
      </div>

      <div className="mt-4 border-t border-[var(--border)] pt-4">
        <span className="text-xs text-[var(--text-secondary)]">
          Criado em {new Date(createdAt).toLocaleDateString("pt-BR")}
        </span>

        <Link
          href={`/detalhesChamado/${id}`}
          className="
            rounded-lg
            bg-[var(--primary)]
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}