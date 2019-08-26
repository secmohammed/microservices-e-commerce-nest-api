import { Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./user.service";
import { UserDTO } from "@commerce/shared";
@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query()
    users(): Promise<UserDTO[]> {
        return this.userService.get();
    }
}
