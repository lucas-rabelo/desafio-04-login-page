type Props = {
    label: string;
}

export function Button({ label }: Props) {
    return(
        <button className="rounded bg-green-500 text-white py-4 px-8 w-full">
            {label}
        </button>
    );
}