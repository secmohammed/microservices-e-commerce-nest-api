import { Module, Scope } from "@nestjs/common";

import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";
import { OrderProductDataLoader } from "../loaders/order-product.loader";
import { ProductService } from "../products/product.service";
import { ProductsModule } from "../products/products.module";
import { UserDataLoader } from "../loaders/user.loader";
import { UserService } from "../users/user.service";
import { UsersModule } from "../users/users.module";

@Module({
    providers: [
        OrderResolver,
        OrderService,
        {
            inject: [UserService],
            useFactory: UserDataLoader.create,
            provide: UserDataLoader,
            scope: Scope.REQUEST
        },
        {
            inject: [ProductService],
            useFactory: OrderProductDataLoader.create,
            provide: OrderProductDataLoader,
            scope: Scope.REQUEST
        }
    ],
    imports: [UsersModule, ProductsModule]
})
export class OrdersModule {}
