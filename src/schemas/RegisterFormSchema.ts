import { z } from "zod";

export const registerFormZodSchema = z.object({
    name: z.string({ required_error: "Insira seu nome" })
           .min(5, { message: "Deve ter no mínimo 5 caracteres" }),
    email: z.string({ required_error: "Informe seu e-mail atual" })
            .email({ message: "Insira um e-mail válido" }),
    birthDate: z.string({ required_error: "Insira uma data" }),
    password: z.string({ required_error: "Senha incorreta" })
               .min(8, { message: "A senha tem que ter no mínimo 8 caracteres." })
               .max(32, { message: "A senha tem que ter no máximo 32 caracteres" })
               .regex(/[A-Z]/, { message: "A senha deve conter pelo menos 1 letra maiúscula" })
               .regex(/[a-z]/, { message: "A senha deve conter pelo menos 1 letra minúscula" })
               .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter pelo menos 1 caracter especial" })
               .trim(),
    passwordConfirm: z.string({ required_error: "Confirme a senha!" }),
}).refine(data => data.passwordConfirm === data.password, {
    message: "As senhas devem ser iguais",
    path: ["passwordConfirm"]
})

export type RegisterFormSchema = z.infer<typeof registerFormZodSchema>;