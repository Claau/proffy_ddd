import ClassRepository from '@useCases/Class/repositories/ClassRepository';
import ConnectionRepository from '@useCases/Connection/respositories/ConnectionRepository';
import ScheduleRepository from '@useCases/Schedule/ScheduleRepository';
import UserRepository from '@useCases/User/repositories/UserRepository';


export const connectionsRepository = new ConnectionRepository();
export const classesRepository = new ClassRepository();
export const usersRepository = new UserRepository();
export const scheduleRepository = new ScheduleRepository();
