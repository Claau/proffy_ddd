
export interface IConnectionsRepository {
    create(user_id: number): Promise<number[] | null>;
    count(): Promise<string | number>;
};