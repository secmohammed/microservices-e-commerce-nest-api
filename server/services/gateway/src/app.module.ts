import { APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";
import { config } from "@commerce/shared";

import { join } from "path";

import { GraphQLErrorFilter } from "./filters/graphql-exception.filter";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { OrdersModule } from "./orders/orders.module";
import { PaymentCardsModule } from "./payments/payment.module";
import { ProductsModule } from "./products/products.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    config.APP_ENV === "production"
      ? GraphQLModule.forRoot({
          typePaths: ["./**/*.gql"],
          context: ({ req, res }) => ({ headers: req.headers }),
          debug: true,
          installSubscriptionHandlers: true
        })
      : GraphQLModule.forRoot({
          typePaths: ["./**/*.gql"],
          definitions: {
            path: join(process.cwd(), "src/schemas/graphql.d.ts")
          },
          context: ({ req, res }) => ({ headers: req.headers }),
          debug: true,
          installSubscriptionHandlers: true
        }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    PaymentCardsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
