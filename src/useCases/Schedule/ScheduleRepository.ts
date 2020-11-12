import db from '@database/connection';
import { IScheduleRepository} from './IScheduleRepository';
import Schedule from './Schedule';


export default class ScheduleRepository implements IScheduleRepository {

    public async create({class_id, week_day, from, to}: Schedule): Promise<Schedule> {
        const classSchedule = new Schedule({
                class_id,
                week_day: week_day,
                from: from,
                to: to
        });

        await db('schedule').insert(classSchedule);
        return classSchedule;
    };
}