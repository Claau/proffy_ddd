
interface ClassInterface {
    id: string;
    subject: string;
    cost:number;
    user_id: number; //ForeingKey
}

export default class Class {

    id?: string;
    subject: string;
    cost: number;
    user_id: number;

    constructor({subject, cost, user_id}: Omit<ClassInterface, 'id'>) {
        this.subject = subject;
        this.cost = cost;
        this.user_id = user_id;
    };

};
