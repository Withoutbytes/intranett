import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { isEmail } from "class-validator";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { database } from "../database";
import { User } from "../user/user.model";

@ObjectType()
export class Task {
    @Field(_type => ID!)
    readonly _id: string;

    @Field(_type => String!)
    @prop({ required: true })
    name: string;

    @Field(_type => Boolean!)
    @prop({ required: true, default: false })
    completed: boolean;

    @Field(_type => Date!)
    @prop({ required: true, default: new Date() })
    createdAt: Date;

    @Field(_type => Date!)
    @prop({ required: true })
    endAt: Date;

    @Field(_type => ID!)
    @prop({ required: true, ref: User })
    createdById: string;

    @Field(_type => [ID]!)
    @prop({ required: true, ref: User })
    responsiblesIds: string[];
}
export const TaskModel = getModelForClass(Task, { existingConnection: database });
