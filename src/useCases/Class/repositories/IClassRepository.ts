import Class from '../entities/Class';

export interface CreateClassDTO {
    subject: string;
    cost: number;
    user_id: number;
};

export default interface IClassRepository {
    filterBySchedule(timeInMinutes: number): Promise<Class[]>;
    filterByWeekDay(week_day: string): Promise<Class[]>;
    filterBySubject(subject: string): Promise<Class[]>;
    create(data: CreateClassDTO): Promise<number[]>;
}; 