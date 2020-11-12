import db from "@database/connection";
import User from "../entities/User"
import IUserRepository, { CreateUserDTO } from "./IUserRepository";


export default class UserRepository implements IUserRepository {

    async create({name, avatar, whatsapp, bio}: CreateUserDTO): Promise<number[]> {
        const user = new User({
            name,
            avatar,
            whatsapp,
            bio
        });
        const users = await db('users').insert(user);
        return users;
    };
}