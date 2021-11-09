import { registerEnumType } from "type-graphql";

export enum Role {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

registerEnumType(Role, {
    name: "Role",
});
