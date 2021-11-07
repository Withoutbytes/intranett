import { Role } from "./Role";

export interface UserJWT {
    _id: string;
    email: string;
    role: Role;
}