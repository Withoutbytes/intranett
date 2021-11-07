import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { Task, TaskModel } from "./task.model";
import { TaskUpdateInput } from "types/TaskUpdateInput";
import { ObjectId } from "mongoose";
import { Context } from "types/Context";
import { mongoose } from "@typegoose/typegoose";


@Resolver(_of => Task)
export class TaskResolver {
    // @Authorized()
    // @Query(_returns => Task, { nullable: true })
    // async task(@Arg("id", _type => Int) id: number): Promise<Task | undefined> {
    //     return await Task.findOne(id);
    // }

    // @Authorized()
    // @Query(_returns => [Task])
    // async tasks(): Promise<Task[]> {
    //     return await Task.find();
    // }

    @Authorized()
    @Mutation(_returns => Task)
    async createTask(
        @Arg("name", () => String) name: string,
        @Arg("responsibles", () => [ID]!) responsibles: [ObjectId],
        @Arg("endAt", () => Date!) endAt: Date,
        @Ctx() ctx: Context
    ): Promise<Task> {
        const task = await TaskModel.create({
            name,
            endAt,
            createBy: mongoose.Types.ObjectId.createFromHexString(ctx.user._id),
            responsibles: [
                mongoose.Types.ObjectId.createFromHexString(ctx.user._id),
                ...responsibles
            ],
        });
        return task.toObject();
    }

    // @Authorized()
    // @Mutation(_returns => Task)
    // async updateTask(@Arg("id", _type => ID) id: number, @Arg("data") data: TaskUpdateInput): Promise<Task> {
    //     const task = await Task.findOne(id);
    //     if (!task) {
    //         throw new Error("Task not found");
    //     }
    //     Object.assign(task, data);
    //     await task.save();
    //     return task;
    // }

    // @Authorized()
    // @Mutation(_returns => Boolean)
    // async deleteTask(@Arg("id", _type => Int) id: number): Promise<boolean> {
    //     const task = await Task.findOne(id);
    //     if (!task) {
    //         throw new Error("Task not found");
    //     }
    //     await task.remove();
    //     return true;
    // }
}


