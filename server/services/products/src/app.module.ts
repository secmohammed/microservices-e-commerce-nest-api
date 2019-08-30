import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [TypeOrmModule.forRoot(), ProductsModule]
})
export class AppModule {}
