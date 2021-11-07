import { Role } from "./Role";

export interface IUserFE {
    _id: string;
    photo: string;
    name: string;
    email: string;
    permission: Role;
}
