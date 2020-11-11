import convertHourToMinutes from '@utils/convertHourToMinutes';
import { Request, Response } from 'express';



export default class ClassesController {
    async index(req: Request, res: Response) {
        const filter = req.query;

        if (!filter.week_day || !filter.subject || !filter.time) {
            return res.sendStatus(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const week_day = filter.week_day as string;
        const subject = filter.subject as string;
        const time = filter.time as string;

        const timeInMinutes = convertHourToMinutes(time);

        // FILTRAS CLASSES POR SUBJECT
        // FILTRAR CLASSES POR WEEK_DAY
        // FILTRAR CLASSES POR SCHEDULE

        return res.json('classes');

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

        try { 
            
            //CRIAR USUARIO

            const user_id = insertedUsersIds[0];

            //CRIAR CLASE
            const class_id = insertedClassesIds[0];
        
            //TRATAMENTO DAS INFOS - REGRAS DE NEGOCIO
            const classSchedule = schedule.map((scheduleItem:ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            })

            //CRIAR SCHEDULE

            return res.sendStatus(201);
        
        } catch(err) {
            return res.sendStatus(400).json({
                error: "unexpected error while creating a new class"
            })
        }
    }
};