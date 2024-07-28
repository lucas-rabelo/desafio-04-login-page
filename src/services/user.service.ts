import { api } from './api';


export async function listUser(token: string) {
    try {
        api.defaults.headers.authorization = `Bearer ${token}`;
        const { data } = await api.get("/users");
        if(data) {
            return data;
        }
    } catch(error) {
        console.log(error)
    }
}

export async function deleteUser(uuid: string) {
    try {
        const { data } = await api.delete(`/users/${uuid}`);
        if(data) {
            return data;
        }
    } catch(error) {
        console.log(error)
    }
}

export async function editUser(uuid: string) {
    try {
        const { data } = await api.get(`/users/${uuid}`);
        if(data) {
            return data;
        }
    } catch(error) {
        console.log(error)
    }
}