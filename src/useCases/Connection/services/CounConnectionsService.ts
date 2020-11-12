import ConnectionRepository from "../respositories/ConnectionRepository";

 
const connectionsRepository = new ConnectionRepository();
 export default class CountConnectionService {
    public execute(): Promise<string | number> {
        const number = connectionsRepository.count()
        return number;
    }
};