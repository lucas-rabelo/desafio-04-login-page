import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export function Application() {
    const navigate = useNavigate();

    function logout() {
        window.localStorage.removeItem('token');

        navigate("/")
    }

    return(
        <div className="flex flex-1 flex-col w-full h-screen items-center justify-center">
            <h1 className="font-bold text-4xl">
                Bem vindo
            </h1>

            <button className="bg-red-600 flex items-center justify-center rounded text-white p-4" onClick={logout}>
                <ArrowLeft size={24} />
                Sair
            </button>
        </div>
    )
}