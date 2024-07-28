import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}

export function Content({ children }: Props) {
    return(
        <main className="flex-1 p-8">
            {children}
        </main>
    )
}