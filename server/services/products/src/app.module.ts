import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: "schema.gql",

            context: ({ req }) => ({ headers: req.headers })
        }),
        ProductsModule
    ]
})
export class AppModule {}
