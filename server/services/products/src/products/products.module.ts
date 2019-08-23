import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductService, ProductResolver]
})
export class ProductsModule {}
