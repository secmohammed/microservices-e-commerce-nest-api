import { Query, Resolver, Context, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserDTO } from "@commerce/shared";
import { LoginUser } from "./login-user.validation";
import { RegisterUser } from "./register-user.validation";
import { AuthGuard } from "../middlewares/auth.guard";
import { SellerGuard } from "../middlewares/seller.guard";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query()
    users(): Promise<UserDTO[]> {
        return this.userService.get();
    }

    @Mutation()
    login(
        @Args("data") data: LoginUser
    ): Promise<{ token: string; id: string; name: string }> {
        return this.userService
            .login(data)
            .then(user => user)
            .catch(err => {
                console.log(err);
            });
    }
    @Mutation()
    register(@Args("data") data: RegisterUser): Promise<UserDTO> {
        return this.userService.register(data);
    }

    @Query()
    @UseGuards(new AuthGuard())
    me(@Context("user") user: any) {
        return this.userService.me(user.id);
    }
}
