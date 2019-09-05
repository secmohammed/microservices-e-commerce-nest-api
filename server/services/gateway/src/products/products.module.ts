import { Module, Scope } from "@nestjs/common";

import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { UserDataLoader } from "../loaders/user.loader";
import { UserService } from "../users/user.service";
import { UsersModule } from "../users/users.module";

@Module({
    providers: [
        ProductResolver,
        ProductService,
        {
            inject: [UserService],
            useFactory: UserDataLoader.create,
            provide: UserDataLoader,
            scope: Scope.REQUEST
        }
    ],
    imports: [UsersModule],
    exports: [ProductService]
})
export class ProductsModule {}
