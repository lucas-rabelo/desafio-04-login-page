import { z } from "zod";

export const forgetFormZodSchema = z.object({
    email: z.string({ required_error: "Informe seu e-mail atual" })
            .email({ message: "Insira um e-mail válido" })
})

export type ForgetFormSchema = z.infer<typeof forgetFormZodSchema>;