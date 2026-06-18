
interface InputProps{
    titulo: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({titulo, placeholder, type, value, onChange} : InputProps){
    return (
        <>
            <div className="flex flex-col gap-2">
                <label className="text-[var(--text-primary)] text-sm font-medium text-zinc-700">
                    {titulo}
                </label>

                <input
                    type={type}
                    placeholder={placeholder}
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
                        shadow-sm
                        transition-all
                        outline-none
                        placeholder:text-[var(--text-secondary)]
                        hover:bg-[var(--surface-hover)]
                        focus:border-[var(--primary)]
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                    "
                />
            </div>
        </>
    );
}