import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TaskUpdateInput {
    @Field({ nullable: true })
    completed?: boolean;

    @Field({ nullable: true })
    finishAt?: Date;

    // TODO: responsibles
    // @Field(type => ID, { nullable: true })
    // responsibles?: ObjectID[];
}