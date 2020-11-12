import { IConnectionsRepository } from "../respositories/IConnectionRepository";

 
 export default class CountConnectionService {
     private connectionsRepository: IConnectionsRepository;

     constructor(connectionsRepository: IConnectionsRepository) {
         this.connectionsRepository = connectionsRepository
     }
     
    public execute( ): Promise<string | number> {
        const number = this.connectionsRepository.count()
        return number;
    }
};