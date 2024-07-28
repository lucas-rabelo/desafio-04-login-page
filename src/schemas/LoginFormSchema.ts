import { z } from "zod";

export const loginFormZodSchema = z.object({
    email: z.string({ required_error: "Informe seu e-mail atual" })
            .email({ message: "Insira um e-mail válido" }),
    password: z.string({ required_error: "Senha incorreta" })
               .min(8, { message: "A senha tem que ter no mínimo 8 caracteres." })
               .max(32, { message: "A senha tem que ter no máximo 32 caracteres" })
               .regex(/[A-Z]/, { message: "A senha deve conter pelo menos 1 letra maiúscula" })
               .regex(/[a-z]/, { message: "A senha deve conter pelo menos 1 letra minúscula" })
               .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "A senha deve conter pelo menos 1 caracter especial" })
               .trim(),
    rememberMe: z.boolean().default(false)
})

export type LoginFormSchema = z.infer<typeof loginFormZodSchema>;