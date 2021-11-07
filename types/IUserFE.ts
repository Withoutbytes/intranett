import { Permission } from "./Permission";

export interface IUserFE {
    _id: string;
    photo: string;
    name: string;
    email: string;
    permission: Permission;
}
