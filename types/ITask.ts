export interface ITask {
    name: string;
    description: string;
    completed: boolean;
    responsible: string[];
    date: Date;
}