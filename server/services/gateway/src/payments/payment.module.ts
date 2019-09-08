import { Module, Scope } from "@nestjs/common";

import { PaymentCardResolver } from "./payment.resolver";
import { PaymentCardService } from "./payment.service";
import { UserDataLoader } from "../loaders/user.loader";
import { UserService } from "../users/user.service";
import { UsersModule } from "../users/users.module";

@Module({
    providers: [
        PaymentCardResolver,
        PaymentCardService,
        {
            inject: [UserService],
            useFactory: UserDataLoader.create,
            provide: UserDataLoader,
            scope: Scope.REQUEST
        }
    ],
    imports: [UsersModule]
})
export class PaymentCardsModule {}
