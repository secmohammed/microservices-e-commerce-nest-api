import { APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { GraphQLErrorFilter } from "./filters/graphql-exception.filter";
import { LoggingInterceptor } from "./loggers/logging.interceptor";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    process.env.GRAPHQL_ENV === "production"
      ? GraphQLModule.forRoot({
          typePaths: ["./**/*.gql"],
          context: ({ req }) => ({ headers: req.headers }),
          debug: true,
          installSubscriptionHandlers: true
        })
      : GraphQLModule.forRoot({
          typePaths: ["./**/*.gql"],
          definitions: {
            path: join(process.cwd(), "src/schemas/graphql.d.ts")
          },
          context: ({ req }) => ({ headers: req.headers }),
          debug: true,
          installSubscriptionHandlers: true
        }),
    UsersModule
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
