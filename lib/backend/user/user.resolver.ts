import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import jwt from "jsonwebtoken";
import sha256 from 'crypto-js/sha256';

import { LoginResponse } from 'types/LoginResponse';
import { User, UserModel } from './user.model';
import { Context } from 'types/Context';
import { UserJWT } from 'types/UserJWT';



@Resolver(_of => User)
export class UserResolver {
    @Mutation(_returns => LoginResponse)
    async login(
        @Arg('email', type => String) email: string,
        @Arg('password', type => String) password: string,
    ) {

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isValid = sha256(password).toString() == user.password;

        if (!isValid) {
            throw new Error('Invalid password');
        }

        let jwtObj: UserJWT = {
            email: user.email,
            role: user.role,
            _id: user._id.toString(),
        };

        return {
            token: jwt.sign(jwtObj, process.env.JWT_KEY),
        };
    }

    @Authorized("ADMIN")
    @Mutation(_returns => User)
    async createUser(
        @Arg('email', type => String) email: string,
        @Arg('password', type => String) password: string,
    ) {
        const hashedPassword = sha256(password).toString();
        const user = await UserModel.create({ email, password: hashedPassword, roles: ['USER'] });
        await user.save();

        return user.toObject();
    }


    @Authorized("ADMIN")
    @Mutation(_returns => User!)
    async deleteUser(@Arg('email', type => String) email: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        await UserModel.deleteOne({ email });
        return user.toObject();
    }

    @Authorized("ADMIN")
    @Query(_returns => User)
    async getUser(@Arg('email', type => String) email: string) {
        const user = await UserModel.findOne({ email });
        return user.toObject();
    }

    @Authorized("ADMIN")
    @Query(_returns => [User])
    async getUsers(): Promise<User[]> {
        const users = await UserModel.find();
        return users.map(user => user.toObject());
    }


    @Authorized("USER")
    @Query(_returns => User!)
    async getMe(
        @Ctx() { user }: Context
    ) {
        const userdb = await UserModel.findOne({ email: user.email });
        if (!user) {
            throw new Error('User not found');
        }
        return userdb.toObject();
    }
}


