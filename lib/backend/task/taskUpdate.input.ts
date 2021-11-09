import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@InputType()
export class TaskUpdateInput {
    @Field({ nullable: true })
    completed?: boolean;

    @Field({ nullable: true })
    finishAt?: Date;

    @Field(type => ID, { nullable: true })
    responsiblesIds?: string[];
}