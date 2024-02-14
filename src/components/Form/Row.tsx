import { Input } from "./Input";

type Props = {
    label: string;
    placeholder: string;
}

export function Row({ label, placeholder }: Props) {
    return(
        <div className="flex flex-col gap-3 w-full">
            <span className="font-normal text-lg">{label}</span>
            <Input placeholder={placeholder} />
        </div>
    );
}