import db from '@database/connection';
import Class from '../entities/Class';
import IClassRepository, { CreateClassDTO } from "./IClassRepository";


export default class ClassRepository implements IClassRepository {

    async filterBySchedule(
        timeInMinutes: number,
        ): Promise<Class[]> {
            const filtered_classes = await db('classes').whereExists(function() {
                    this.select('schedule.*')
                        .from('schedule')
                        .whereRaw('`schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`schedule`.`to` > ??', [timeInMinutes])
                }
                ).join('users', 'classes.user_id', '=', 'users.id')
                 .select(['classes.*', 'users.*'])
            
        return filtered_classes;
    };

    async filterByWeekDay(
        week_day: string,
        ): Promise<Class[]> {
            
            const filtered_classes = await db('classes').whereExists(
                function() {
                    this.select('schedule.*')
                        .from('schedule')
                        .whereRaw('`schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`schedule`.`week_day` == ??', [Number(week_day)])
                    }
                ).join('users', 'classes.user_id', '=', 'users.id')
                 .select(['classes.*', 'users.*'])
            
            return filtered_classes;
    }; 

    async filterBySubject(
        subject: string,
        ): Promise<Class[]>{

            const filtered_calsses = await db('classes').where('classes.subject', '=', subject)
                    .join('users', 'classes.user_id', '=', 'users.id')
                    .select(['classes.*', 'users.*'])
            
            console.log

            return filtered_calsses;
    };

    async create({subject, cost, user_id}:CreateClassDTO): Promise<number[]> {
        const insertedClassesIds = await db('classes').insert({
            subject,
            cost,
            user_id
        });

        return insertedClassesIds;
    }
};