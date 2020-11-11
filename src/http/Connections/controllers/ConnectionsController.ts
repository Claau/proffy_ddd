import { Request, Response } from 'express';
import ConnectionsRepository from '@useCases/Connection/respositories/ConnectionRepository';

const connectionsRepository = new ConnectionsRepository();

export default class ConnnectionsController {
    async index(req: Request, res: Response) {
        //OBTER NUMERO DE CONNECTIONS
        return res.json('connections');
    };

    async create(req: Request, res: Response) {
        const { user_id } = req.body;

        //criar connections no db
        return res.sendStatus(201);        
    };
}