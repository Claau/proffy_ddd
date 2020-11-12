import CountConnectionService from '@useCases/Connection/services/CounConnectionsService';
import CreateConnectionService from '@useCases/Connection/services/CreateConnectionService';
import { Request, Response } from 'express';


export default class ConnnectionsController {
    async index(req: Request, res: Response) {
        const countConnections = new CountConnectionService();

        try {
            const total = await countConnections.execute();
            return res.json(total);
        } catch(err) {
            return res.sendStatus(400).json({
                error: err.message
            });
        }
    };

    async create(req: Request, res: Response) {
        const { user_id } = req.body;

        try {
            const createConnections = new CreateConnectionService();
            await createConnections.execute(user_id);

        } catch(err) {
            return res.sendStatus(400).json({
                error: err.message
            });
        }
        
        return res.sendStatus(201);        
    };
} 