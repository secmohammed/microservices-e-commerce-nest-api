import { Provider, Scope } from "@nestjs/common";

import { UserDataLoader } from "../loaders/user.loader";
import { UserService } from "../users/user.service";

export const usersDataLoaderProvider: Provider = {
    inject: [UserService],
    useFactory: UserDataLoader.create,
    provide: UserDataLoader,
    scope: Scope.REQUEST
};
