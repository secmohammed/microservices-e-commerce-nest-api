import { UserDTO } from "@commerce/shared";
// import { UseGuards } from "@nestjs/common";

import { Query, Resolver } from "@nestjs/graphql";

// import { AuthGuard } from "../middlewares/auth.guard";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query()
    // @UseGuards(new AuthGuard())
    users(): Promise<UserDTO[]> {
        return this.userService.get();
    }
}
