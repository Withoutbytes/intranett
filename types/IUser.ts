import { Permission } from "./Permission";

export interface IUser {
    _id: string;
    photo: string;
    nome: string;
    email: string;
    senha: string;
    permission: Permission;
}