import Schedule from "@useCases/Schedule/Schedule";
import ScheduleRepository from "@useCases/Schedule/ScheduleRepository";
import UserRepository from "@useCases/User/repositories/UserRepository";
import ClassRepository from "../repositories/ClassRepository";

// +  controller:  request.body
// +  repository: alterar/obter/deletar/postar infos nele

const classesRepository = new ClassRepository();
const usersRepository = new UserRepository();
const scheduleRepository = new ScheduleRepository();

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
    public async execute({
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule}: RequestBody ): Promise<number | null> {

      const insertedUsersIds = await usersRepository.create({
          name,
          avatar,
          whatsapp,
          bio 
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await classesRepository.create({
          subject,
          cost,
          user_id 
        });

      const class_id = insertedClassesIds[0];
  
      //TRATAMENTO DAS INFOS - REGRAS DE NEGOCIO
      const classSchedule = await schedule.map((scheduleItem:Schedule) => {
          return scheduleRepository.create({
              class_id,
              week_day: scheduleItem.week_day,
              from: scheduleItem.from,
              to: scheduleItem.to });
      })

      return class_id;

    }
};
