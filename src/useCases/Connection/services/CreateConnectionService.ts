import ConnectionRepository from "../respositories/ConnectionRepository";

const connectionsRepository  = new ConnectionRepository();

 export default class CreateConnectionService {
     public async execute(user_id: number): Promise<number[] | null> {
        const connection = await connectionsRepository.create(user_id);
        return connection;
    }
}