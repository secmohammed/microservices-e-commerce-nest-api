import { Module } from "@nestjs/common";
import { PaymentsModule } from "./payments/payments.module";
import { TypeOrmModule } from "@nestjs/typeorm";
const ormconfig = require("../ormconfig.json");

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig[0]), PaymentsModule]
})
export class AppModule {}
