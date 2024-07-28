import { useEffect, useState } from "react";

// import { ArrowLeft } from "@phosphor-icons/react";
// import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Content } from "../components/layout/Content";
import { Footer } from "../components/layout/Footer";
import { UserList } from "../components/tables/UserList";

import { deleteUser, listUser } from "../services/user.service";

export function Users() {
    const token = window.localStorage.getItem("token");
    const [data, setData] = useState<User[]>([]);

    async function getUsers(token: string) {
        const data = await listUser(token);
        if(data) {
            setData(data);
        }
    }

    async function deleteUserByUuid(uuid: string) {
        const data = await deleteUser(uuid);
        if(data) {
            getUsers(token!);
        }
    }

    useEffect(() => {
        if(token) {
            getUsers(token);
        }
    }, [])
    // const navigate = useNavigate();

    // function logout() {
    //     window.localStorage.removeItem('token');

    //     navigate("/")
    // }

    return(
        <div className="flex flex-1 flex-col w-full h-screen bg-green-100">
            <Header />
            <Content>
                <UserList 
                    data={data} 
                    onDelete={deleteUserByUuid}
                />
            </Content>
            <Footer />
            {/* <h1 className="font-bold text-4xl">
                Bem vindo
            </h1>

            <button className="bg-red-600 flex items-center justify-center rounded text-white p-4" onClick={logout}>
                <ArrowLeft size={24} />
                Sair
            </button> */}
        </div>
    )
}