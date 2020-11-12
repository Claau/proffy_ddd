import { classesRepository, scheduleRepository, usersRepository } from '@container';
import CreateClassService from '@useCases/Class/services/CreateClassesService';
import ListClassService from '@useCases/Class/services/ListClassesService';
import { Request, Response } from 'express';

// + Tratamento de request e response
// + Tratamento de erros
// x Tratamento do db
// x Regras de negocio

export default class ClassesController {
    async index(req: Request, res: Response) {
        const filter = req.query;

        const week_day = filter.week_day as string;
        const subject = filter.subject as string;
        const time = filter.time as string;

        try {
            const listClasses = new ListClassService(
                classesRepository
            );

            const classes = await listClasses.execute({ week_day, subject, time });
            return res.json(classes);
        
        } catch(err) {
            return res.send(400).json({
                error: err.message
            });
        }
        
    };

    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;

        const createClass = new CreateClassService(
            classesRepository,
            usersRepository,
            scheduleRepository
        );

        try { 
            const classes = await createClass.execute({
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule
            });

            return res.sendStatus(201);
        } catch(err) {
            return res.json({
                error: "unexpected error while creating a new class"
            })
        }
    }
};