import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Hero } from "../components/layout/Hero";

import { LoginForm } from "../components/forms/LoginForm";
import { RegisterForm } from "../components/forms/RegisterForm";
import { ForgetForm } from "../components/forms/ForgetForm";
import { ResetForm } from "../components/forms/ResetForm";

type Params = {
    token?: string;
}

export function Login() {
    const params = useParams<Params>();
    const token = params.token;

    const [formTypeShow, setFormTypeShow] = useState<"login" | "register" | "forget" | "reset">("login");

    useEffect(() => {
        if(token) {
            setFormTypeShow("reset");
        }
    }, [token])

    return(
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center h-screen w-full">
            <Hero />
            {formTypeShow === 'login' ? <LoginForm setChangeTypeForm={setFormTypeShow} /> : null}
            {formTypeShow === 'register' ? <RegisterForm setChangeTypeForm={setFormTypeShow} /> : null}
            {formTypeShow === 'forget' ? <ForgetForm setChangeTypeForm={setFormTypeShow} /> : null}
            {formTypeShow === 'reset' ? <ResetForm token={token} setChangeTypeForm={setFormTypeShow} /> : null}
        </main>
    );
}