
// + controller conetar com o service: "request.body"
// + conectar  no repository com o service
// + service retorna o "response" pro controller

import { IScheduleRepository } from "@useCases/Schedule/IScheduleRepository";
import Schedule from "@useCases/Schedule/Schedule";
import IUserRepository from "@useCases/User/repositories/IUserRepository";
import IClassRepository from "../repositories/IClassRepository";


interface RequestBody {
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: number,
    schedule: Schedule[]
};

export default class CreateClassService {
    private usersRepository: IUserRepository;
    private classesRepository: IClassRepository;
    private scheduleRepository: IScheduleRepository;

    constructor(
        classesRepository: IClassRepository,
        usersRepository: IUserRepository,
        scheduleRepository: IScheduleRepository
        ) {
            this.classesRepository = classesRepository;
            this.usersRepository = usersRepository;
            this.scheduleRepository = scheduleRepository;
        }


    public async execute({
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    }: RequestBody) {

        const insertedUsersIds = await this.usersRepository.create({ name, avatar, whatsapp, bio });
        const user_id = insertedUsersIds[0];


        const insertedClassesIds = await this.classesRepository.create({ subject, cost, user_id });
        const class_id = insertedClassesIds[0];

        // TRATA AS INFOS - REGRA DE NEGOCIO
        const classSchedule = schedule.map((scheduleItem: Schedule) => {
            const from_f = Number(scheduleItem.from);
            const to_f = Number(scheduleItem.to)
            return this.scheduleRepository.create({
                class_id,
                week_day: scheduleItem.week_day,
                from: from_f,
                to: to_f });
        });

        return class_id;
    };
};