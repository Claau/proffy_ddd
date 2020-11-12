import Connection from '../entities/Connection';
import db from '@database/connection';
import { IConnectionsRepository } from './IConnectionRepository';

class ConnectionRepository implements IConnectionsRepository {

    constructor() {}

    public async create(user_id: number): Promise<number[] | null> {
        const connection_obj = new Connection({user_id})
        const connection = await db("connections").insert({
            connection_obj
        });
        return connection;
    };

    public async count(): Promise<string | number> {
        const connections = await db('connections').count('* as total');
        const { total } = connections[0];
        return total;
    };
};

export default ConnectionRepository;