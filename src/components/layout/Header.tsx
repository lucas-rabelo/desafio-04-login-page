export function Header() {
    return(
        <header className="w-full bg-white p-5 flex items-center justify-between">
            <h1 className="text-lg text-green-700 font-bold">
                Login App
            </h1>

            <button className="py-2 px-4 rounded bg-red-600 text-white ">
                Sair
            </button>
        </header>
    )
}