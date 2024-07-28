import GoogleIcon from '../assets/google.svg';

type Props = {
    label?: string;
}

export function ButtonGoogle({ label = "Ou faça login com o Google" }: Props) {
    return(
        <button className="flex flex-row items-center justify-center gap-2 rounded bg-slate-800 text-white py-4 px-8 w-full">
            <img src={GoogleIcon} alt="Logo do google" /> {label}       
        </button>
    );
}