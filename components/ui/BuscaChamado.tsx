interface BuscaChamadoProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BuscaChamado({
  value,
  onChange,
}: BuscaChamadoProps) {
  return (
    <input
      type="text"
      placeholder="Buscar chamado..."
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-lg
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-4
        py-3
        text-sm
        text-[var(--text-primary)]
        outline-none
        transition
        placeholder:text-[var(--text-secondary)]
        focus:border-[var(--primary)]
        focus:ring-2
        focus:ring-[var(--primary)]/20
      "
    />
  );
}