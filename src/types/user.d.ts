type CreateUserDto = {
    name: string;
    email: string;
    role: string | null;
    password: string;
    birthDate: string;
}

type UpdateUserDto = Partial<CreateUserDto>;

type ReadUserDto = Partial<CreateUserDto> & {
    uuid: string;
    createdAt: string;
    updatedAt: string;
}