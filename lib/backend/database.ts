import { mongoose } from "@typegoose/typegoose";
export const database = mongoose.createConnection(process.env.DATABASE_URL);