import IClassRepository from "@useCases/Class/repositories/IClassRepository";
import ConnectionRepository from "../respositories/ConnectionRepository";
import { IConnectionsRepository } from "../respositories/IConnectionRepository";

 

 export default class CountConnectionService {
    private connectionRepository : IConnectionsRepository;

    constructor(connectionRepository: IConnectionsRepository) {
        this.connectionRepository = connectionRepository;
    }

    public execute(): Promise<string | number> {
        const number = this.connectionRepository.count()
        return number;
    }
};