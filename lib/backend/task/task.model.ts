import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { isEmail } from "class-validator";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { database } from "../database";
import { User } from "../user/user.model";

@ObjectType()
export class Task {
    @Field(_type => ID)
    readonly _id: ObjectId;

    // @Field(_type => String!)
    // @prop({ required: true })
    // description: string;

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

    @Field(_type => User!)
    @prop({ required: true })
    createBy: Ref<User>;

    @Field(_type => [User]!)
    @prop({ required: true })
    responsibles: Ref<User>[];
}
export const TaskModel = getModelForClass(Task, { existingConnection: database });
