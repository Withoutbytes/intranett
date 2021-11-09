import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { database } from "../database";

@ObjectType()
export class Company {
	@Field(() => ID)
	readonly _id: string;

	@Field()
	@Prop({ required: true })
	name: string;
}

export const CompanyModel = getModelForClass(Company, { existingConnection: database });
