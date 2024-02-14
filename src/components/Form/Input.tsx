import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...rest }: Props) {
    return(
        <input className="w-full font-normal text-gray-600 bg-green-100 p-4 rounded" {...rest}/>
    );
}