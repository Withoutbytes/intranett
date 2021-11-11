import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Task, TaskModel } from "./task.model";
import { TaskUpdateInput } from "./taskUpdate.input";
import { ObjectId } from "mongoose";
import { Context } from "types/Context";
import { mongoose } from "@typegoose/typegoose";
import { User, UserModel } from "../user/user.model";
import { TaskCreateInput } from "./taskCreate.input";
import { Role } from "../user/role.type";

@Resolver((_of) => Task)
export class TaskResolver {
    
  @Authorized("ADMIN")
  @Query((_returns) => [Task]!)
  async getTasksAll(
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("limit", () => Int, { defaultValue: 0 }) limit: number,
    @Ctx() ctx: Context
  ): Promise<Task[]> {
    const tasks = await TaskModel.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return tasks.map((task) => task.toObject());
  }

  @Authorized()
  @Query((_returns) => [Task]!)
  async getTasks(
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("limit", () => Int, { defaultValue: 0 }) limit: number,
    @Ctx() ctx: Context
  ): Promise<Task[]> {
    const tasks = await TaskModel.find({
      responsibles: {
        $in: [ctx.user._id],
      },
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return tasks.map((task) => task.toObject());
  }

  @Authorized()
  @Mutation((_returns) => Task)
  async createTask(
    @Arg("data") { responsiblesIds, endAt, name }: TaskCreateInput,
    @Ctx() ctx: Context
  ): Promise<Task> {
    if (responsiblesIds.length) {
      if (
        !(await UserModel.exists({
          _id: { $in: responsiblesIds },
        }))
      ) {
        throw new Error("Responsibles not found");
      }
    }

    // if (await TaskModel.exists({ name, createdBy: ctx.user._id })) {
    //     throw new Error("Task with this name already exists");
    // }

    const task = await TaskModel.create({
      name,
      endAt,
      createdById: ctx.user._id,
      responsiblesIds: [...responsiblesIds, ctx.user._id],
    });

    return task.toObject();
  }

  @Authorized()
  @Mutation((_returns) => Boolean!)
  async updateTask(
    @Arg("id", (_type) => ID) id: string,
    @Arg("data") data: TaskUpdateInput,
    @Ctx() ctx: Context
  ) {
    const task = await TaskModel.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    if (
      ctx.user.role != Role.ADMIN &&
      !task.responsiblesIds.includes(ctx.user._id)
    )
      throw new Error("You are not responsible for this task");

    await task.updateOne({ $set: data });
    return true;
  }

  @Authorized()
  @Mutation((_returns) => Boolean)
  async deleteTask(
    @Arg("id", (_type) => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const task = await TaskModel.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    if (
      ctx.user.role != Role.ADMIN &&
      !task.responsiblesIds.includes(ctx.user._id)
    )
      throw new Error("You are not responsible for this task");
    await task.remove();
    return true;
  }

  @FieldResolver((_type) => User)
  async createdBy(@Root() task: Task): Promise<User> {
    const user = await UserModel.findById(task.createdById);
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject();
  }

  @FieldResolver((_type) => [User]!)
  async responsibles(@Root() task: Task): Promise<User[]> {
    const users = task.responsiblesIds.map(async (id: string) => {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user.toObject();
    });

    return Promise.all(users);
  }
}
