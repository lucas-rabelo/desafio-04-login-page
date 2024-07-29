import { SpinnerGap } from "@phosphor-icons/react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    color?: string;
    textColor?: string;
    size?: string;
}

export function ButtonSecondary({ label, disabled, color = "bg-green-700", textColor = "text-white", size = "w-full", ...rest }: Props) {
    return(
        <button 
            className={`rounded ${disabled ? "bg-gray-600 flex items-center justify-center gap-2" : color} ${textColor} hover:opacity-65 duration-300 py-2 px-4 ${size}`}
            {...rest}
        >
            {disabled && <SpinnerGap className="animate-spin" size={24} />}
            {label}
        </button>
    );
}