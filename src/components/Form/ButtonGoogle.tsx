import GoogleIcon from '../../assets/google.svg';

export function ButtonGoogle() {
    return(
        <button className="flex flex-row items-center justify-center gap-2 rounded bg-slate-800 text-white py-4 px-8 w-full">
            <img src={GoogleIcon} alt="Logo do google" /> Ou faça login com o Google       
        </button>
    );
}