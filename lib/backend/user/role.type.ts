import { registerEnumType } from "type-graphql";

export enum Role {
    ADMIN = "admin",
    MEMBER = "member",
}

registerEnumType(Role, {
    name: "Role",
});
