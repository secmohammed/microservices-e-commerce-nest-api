import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
const ormconfig = require("../ormconfig.json");

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig[0]), ProductsModule]
})
export class AppModule {}
