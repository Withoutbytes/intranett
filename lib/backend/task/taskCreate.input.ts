import { ObjectId } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@InputType()
export class TaskCreateInput {
    @Field()
    name: string;

    @Field(() => [String])
    responsiblesIds: string[];

    @Field()
    endAt: Date;
}