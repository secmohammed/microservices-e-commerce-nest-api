import { Module } from "@nestjs/common";
import { OrdersModule } from "./orders/orders.module";
import { TypeOrmModule } from "@nestjs/typeorm";
const ormconfig = require("../ormconfig.json");
@Module({
    imports: [TypeOrmModule.forRoot(ormconfig[0]), OrdersModule]
})
export class AppModule {}
