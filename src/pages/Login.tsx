import { Form } from "../components/Form/Form";
import { Hero } from "../components/Hero";

export function Login() {
    return(
        <main className="flex flex-row items-center justify-center bg-green-200">
            <Hero />
            <Form />
        </main>
    );
}