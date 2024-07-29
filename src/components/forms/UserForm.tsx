import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, registerFormZodSchema } from "../../schemas/RegisterFormSchema";

import { ButtonSecondary } from "../ButtonSecondary";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, editUser, updateUser } from "../../services/user.service";
import { queryClient } from "../../services/query-client";

type Props = {
    userUuid?: string;
    onCancel: () => void;
}

export function UserForm({ userUuid, onCancel }: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false);

    const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormZodSchema),
    });

    const { isLoading } = useQuery({
        queryKey: ['users', userUuid],
        queryFn: async ({ queryKey }) => {
            const data = await editUser(queryKey[1]!)
            if(data) {
                setValue("name", data.name || "");
                setValue("email", data.email || "");
                setValue("birthDate", data.birthDate || "");
                setValue("role", data.role || "");
            }
        },
        enabled: !!userUuid
    })

    const { mutate: createUserFn } = useMutation({
        mutationFn: async (data: CreateUserDto) => await createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    })

    const { mutate: updateUserFn } = useMutation({
        mutationFn: async (data: CreateUserDto) => await updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    })

    function onFinish(props: RegisterFormSchema) {
        if(userUuid) {
            updateUserFn({
                name: props.name,
                email: props.email,
                birthDate: props.birthDate,
                password: props.password,
                role: props.role
            })
        } else {
            createUserFn({
                name: props.name,
                email: props.email,
                birthDate: props.birthDate,
                password: props.password,
                role: props.role
            })
        }

        reset();
        onCancel();
    }

    function handleCancel(event: FormEvent) {
        event.preventDefault();

        reset();
        onCancel();
    }

    return(
        <form onSubmit={handleSubmit(onFinish)}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">Nome</span>
                        <input 
                            className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                            type='text'
                            placeholder='Nome completo' 
                            {...register('name')}    
                        />
                        {errors?.name?.message ?
                            <span className="text-red-500">{errors?.name?.message}</span> :
                            null
                        }
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">E-mail</span>
                        <input 
                            className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                            type='email'
                            placeholder='exemplo@gmail.com' 
                            {...register('email')}    
                        />
                        {errors?.email?.message ?
                            <span className="text-red-500">{errors?.email?.message}</span> :
                            null
                        }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">Data de nascimento</span>
                        <input 
                            className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                            type='date'
                            placeholder='12/01/1997' 
                            {...register('birthDate')}    
                        />
                        {errors?.birthDate?.message ?
                            <span className="text-red-500">{errors?.birthDate?.message}</span> :
                            null
                        }
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">Tipo de usuário</span>
                        <select 
                            className="w-full font-normal text-gray-600 bg-slate-50 px-4 py-5 rounded border-[1px] border-slate-300" 
                            {...register('role')}
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors?.birthDate?.message ?
                            <span className="text-red-500">{errors?.birthDate?.message}</span> :
                            null
                        }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="relative flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">Senha</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                            placeholder='Senha'
                            {...register('password')}    
                        />
                        <button type="button" className="absolute p-4 right-1 top-[33px]" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                        </button>
                        {errors?.password?.message ?
                            <span className="text-red-500">{errors?.password?.message}</span> :
                            null
                        }
                    </div>
                    <div className="relative flex flex-col gap-1 w-full">
                        <span className="font-normal text-lg">Confirme a senha</span>
                        <input
                            type={showConfirmedPassword ? "text" : "password"}
                            className="w-full font-normal text-gray-600 bg-slate-50 p-4 rounded border-[1px] border-slate-300" 
                            placeholder='Confirme a Senha'
                            {...register('passwordConfirm')}    
                        />
                        <button type="button" className="absolute p-4 right-1 top-[33px]" onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}>
                            {showConfirmedPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                        </button>
                        {errors?.passwordConfirm?.message ?
                            <span className="text-red-500">{errors?.passwordConfirm?.message}</span> :
                            null
                        }
                    </div>
                </div>

                <div className="w-full flex justify-end mt-4">
                    <div className="flex items-center gap-4 w-1/2">
                        <ButtonSecondary 
                            label="Cancelar" 
                            textColor="text-black"
                            color="bg-slate-100 border-[1px] border-slate-300"
                            onClick={handleCancel}
                            disabled={isLoading}
                        />
                        <ButtonSecondary
                            type='submit'
                            label="Salvar" 
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}