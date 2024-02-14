import { Button } from './Button';
import { ButtonGoogle } from './ButtonGoogle';
import { Row } from './Row';

export function Form() {
    return(
        <div className="flex flex-col items-center justify-center h-screen w-full lg:w-1/2 bg-white">
            <form className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <h3 className="font-medium text-xl">Bem vindo de volta</h3>
                    <h1 className="font-bold text-4xl">Faça login na sua conta</h1>
                </div>
                <div className="flex flex-col gap-8">
                    <Row label="Email" placeholder='exemplo@gmail.com'/>
                    <Row label="Senha" placeholder='123456'/>
                    <div className="flex fle-row justify-between">
                        <div className="flex items-center gap-2">
                            <input type="radio" name="remenber" id="remenber" />
                            <label>Lembre de mim</label>
                        </div>

                        <a className="font-normal text-green-500" href="#">Esqueceu a senha?</a>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <Button label="Entrar na conta" />
                    
                    <ButtonGoogle />
                </div>
                <div className="flex justify-center gap-1">
                    <span className="font-medium">Não tem uma conta?</span><a className="font-normal text-green-500" href="#">Cadastre-se</a>
                </div>
            </form>
        </div>
    );
}