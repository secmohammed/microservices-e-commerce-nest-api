import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: "default",
            type: "mongodb",
            host: "localhost",
            database: "products-module",
            entities: ["dist/**/*.entity.js"],
            port: 27017,
            useNewUrlParser: true,
            logging: true
        }),
        ProductsModule
    ]
})
export class AppModule {}
