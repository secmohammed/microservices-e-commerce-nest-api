import { Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "../schemas/graphql";
@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query()
    users(): Promise<User[]> {
        return this.userService.get();
    }
}
