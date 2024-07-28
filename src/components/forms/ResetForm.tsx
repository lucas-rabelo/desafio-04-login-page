import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from '@phosphor-icons/react'

import { Button } from '../Button';

import { zodResolver } from '@hookform/resolvers/zod';
import { ResetFormSchema, resetFormZodSchema } from '../../schemas/ResetFormSchema';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

type Props = {
    token?: string;
    setChangeTypeForm: Dispatch<SetStateAction<"login" | "register" | "forget" | "reset">>;
}

export function ResetForm({ token, setChangeTypeForm }: Props) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm<ResetFormSchema>({
        resolver: zodResolver(resetFormZodSchema),
    });

    async function onSubmit({ password }: ResetFormSchema) {
        setIsLoading(true);

        try {
            api.defaults.headers.authorization = `Bearer ${token}`;
            const { data } = await api.post(`/auth/reset`, {
                password,
                token
            });

            if(data) {
                window.localStorage.setItem('token', data.access_token);
                navigate("/application")
            }

            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
        // console.log({ password, confirmedPassword });
    }

    return(
        <div className="flex flex-col items-center justify-center py-5 px-8 h-screen w-full lg:w-1/2 bg-white">
            <form 
                onSubmit={handleSubmit((data, event) => {
                    event?.preventDefault();
                    onSubmit(data)
                })}
                className="flex flex-col gap-6 w-full md:w-[500px] lg:w-[400px]"
            >
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-xl">Mudar senha</h3>
                    <h1 className="font-bold text-2xl">Mude sua senha para poder acessar o aplicativo</h1>
                </div>
                <div className="flex flex-col gap-6">
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
                            {...register('confirmedPassword')}    
                        />
                        <button type="button" className="absolute p-4 right-1 top-[33px]" onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}>
                            {showConfirmedPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                        </button>
                        {errors?.confirmedPassword?.message ?
                            <span className="text-red-500">{errors?.confirmedPassword?.message}</span> :
                            null
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Button 
                        type='submit'
                        label="Enviar"
                        disabled={isLoading}
                    />                    
                </div>
            </form>
            <div className="flex justify-center gap-1 mt-10">
                <span className="font-medium">Já tenho uma conta</span>
                <a className="font-normal text-green-500" onClick={() => setChangeTypeForm("login")}>Faça login</a>
            </div>
        </div>
    );
}