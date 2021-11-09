import { Role } from "lib/backend/user/role.type";

export interface UserJWT {
    _id: string;
    email: string;
    role: Role;
}