
export interface CreateUserDTO {
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
};

export default interface IUserRepository {
    create(data: CreateUserDTO): Promise<number[]>;
};
