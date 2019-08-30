import { UseGuards } from "@nestjs/common";

import { Query, Resolver, Context, Mutation, Args } from "@nestjs/graphql";
import { UserDTO, RegisterUser, LoginUser } from "@commerce/shared";
import { AuthGuard } from "../middlewares/auth.guard";

import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query()
    users(): Promise<UserDTO[]> {
        return this.userService.get();
    }

    @Mutation()
    login(@Args("data") data: LoginUser): Promise<UserDTO> {
        return this.userService.login(data);
    }
    @Mutation()
    register(@Args("data") data: RegisterUser): Promise<UserDTO> {
        return this.userService.register(data);
    }

    @Query()
    @UseGuards(new AuthGuard())
    me(@Context("user") user: any) {
        return this.userService.me(user);
    }
}
