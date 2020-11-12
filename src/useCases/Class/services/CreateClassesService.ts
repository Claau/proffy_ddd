import { IScheduleRepository } from "@useCases/Schedule/IScheduleRepository";
import Schedule from "@useCases/Schedule/Schedule";
import IUserRepository from "@useCases/User/repositories/IUserRepository";
import IClassRepository from "../repositories/IClassRepository";

// +  controller:  request.body
// +  repository: alterar/obter/deletar/postar infos nele

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
    private classesRepository: IClassRepository;
    private usersRepository: IUserRepository;
    private scheduleRepository: IScheduleRepository;

    constructor(
        classesRepository: IClassRepository,
        usersRepository: IUserRepository,
        scheduleRepository: IScheduleRepository) {
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
        schedule}: RequestBody ): Promise<number | null> {

      const insertedUsersIds = await this.usersRepository.create({
          name,
          avatar,
          whatsapp,
          bio 
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await this.classesRepository.create({
          subject,
          cost,
          user_id 
        });

      const class_id = insertedClassesIds[0];
  
      //TRATAMENTO DAS INFOS - REGRAS DE NEGOCIO
      const classSchedule = await schedule.map((scheduleItem:Schedule) => {
          return this.scheduleRepository.create({
              class_id,
              week_day: scheduleItem.week_day,
              from: scheduleItem.from,
              to: scheduleItem.to });
      })

      return class_id;

    }
};
