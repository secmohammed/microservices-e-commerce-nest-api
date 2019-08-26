import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";

import { join } from "path";
import { LoggingInterceptor } from "./loggers/logging.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";

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
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
