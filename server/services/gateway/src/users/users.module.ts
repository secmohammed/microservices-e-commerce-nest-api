import { APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { UserDataLoader } from "../loaders/user.loader";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    providers: [UserResolver, UserService],
    exports: [UserService]
})
export class UsersModule {}
