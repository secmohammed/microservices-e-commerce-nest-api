import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrderController } from "./order.controller";
import { OrderEntity } from "./order.entity";
import { OrderService } from "./order.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrdersModule {}
