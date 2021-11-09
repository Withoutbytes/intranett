import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import jwt from "jsonwebtoken";
import sha256 from 'crypto-js/sha256';

import { LoginResponse } from './loginResponse.type';
import { User, UserModel } from './user.model';
import { Context } from 'types/Context';
import { UserJWT } from 'types/UserJWT';
import { Role } from './role.type';



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

    @Mutation(_returns => User!)
    async register(
        @Arg('name', type => String) name: string,
        @Arg('email', type => String) email: string,
        @Arg('password', type => String) password: string,
        @Arg('role', type => Role) role: Role,
    ) {
        const hashedPassword = sha256(password).toString();
        const user = await UserModel.create({ email, password: hashedPassword, role, name });

        return user.toObject();
    }

    @Authorized("ADMIN")
    @Mutation(_returns => Boolean!)
    async deleteUser(@Arg('email', type => String) email: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        await UserModel.deleteOne({ email });
        return true;
    }

    @Authorized("ADMIN")
    @Query(_returns => User)
    async getUser(@Arg('email', type => String) email: string) {
        const user = await UserModel.findOne({ email });
        return user.toObject();
    }

    @Authorized()
    @Query(_returns => [User])
    async getUsers(): Promise<User[]> {
        const users = await UserModel.find();
        return users.map(user => user.toObject());
    }

    @Authorized()
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


