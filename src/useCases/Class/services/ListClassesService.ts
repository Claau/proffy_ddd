import convertHourToMinutes from "@utils/convertHourToMinutes";
import Class from "../entities/Class";
import ClassRepository from "../repositories/ClassRepository";
import IClassRepository from "../repositories/IClassRepository";

interface RequestBody {
    week_day: string;
    time: string;
    subject: string;
};

export default class ListClassService {
    private classesRepository : IClassRepository;

    constructor(classesRepository: IClassRepository) {
        this.classesRepository = classesRepository;
    }

    public async execute({week_day, subject, time}: RequestBody): Promise<Class[]| null> {
        
        if (!week_day || !subject || !time) {
            throw Error('Missing filters to search classes');
        }
    
        const timeInMinutes = convertHourToMinutes(time);
    
        const subject_classes: Class[] = await this.classesRepository.filterBySubject(subject);
        const week_day_classes: Class[] = await this.classesRepository.filterByWeekDay(week_day);
        const schedule_classes: Class[] = await this.classesRepository.filterBySchedule(timeInMinutes);
       
        const intersection_classes_filtered = subject_classes.filter(clas1 => {
            const in_array_1 = week_day_classes.filter(clas2 => clas1.id == clas2.id) 
            const in_array_2 = schedule_classes.filter(clas2 => clas1.id == clas2.id) 
            return in_array_1.length /*&& in_array_2.length*/;
        });

        return intersection_classes_filtered;
    };
}