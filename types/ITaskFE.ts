import { IUserFE } from './IUserFE';

export interface ITaskFE {
    name: string;
    description: string;
    completed: boolean;
    responsible: IUserFE[];
    date: Date;
}