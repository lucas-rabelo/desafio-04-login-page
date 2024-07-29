import { api } from './api';

export async function signIn(email: string, password: string) {
    const { data } = await api.post("/auth/login", {
        email,
        password
    });
    return data;
}

export function signOut() {
    window.localStorage.removeItem('token');
}

export async function register(createUserDto: CreateUserDto) {
    const { data } = await api.post("/auth/register", createUserDto);
    return data;
}