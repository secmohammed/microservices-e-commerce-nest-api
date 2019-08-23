import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";
import { ProductController } from "./product.controller";
@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductsModule {}
