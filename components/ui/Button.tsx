interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick, }: ButtonProps){
    return (
        <>
        <button
            onClick={onClick}
            className="
                w-full
                rounded-lg
                bg-[var(--primary)]
                px-4
                py-3
                font-medium
                text-white
                shadow-sm
                transition-all
                hover:bg-[var(--primary-hover)]
                hover:shadow-md
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
            >
                {text}
            </button>
        </>
    );
}