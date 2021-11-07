import { getModelForClass, prop } from "@typegoose/typegoose";
import { isEmail } from "class-validator";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Role } from "types/Role";
import { database } from "../database";

@ObjectType()
export class User {
    @Field(_type => ID)
    readonly _id: ObjectId;

    @prop({ required: true })
    password: string;

    @Field(_type => Role)
    @prop({ required: true, default: Role.MEMBER })
    role: Role;

    @Field(_type => String)
    @prop({ required: true, unique: true, validate: isEmail })
    email: string;
}
export const UserModel = getModelForClass(User, { existingConnection: database });
