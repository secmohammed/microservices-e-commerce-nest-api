import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";

import { join } from "path";

import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    process.env.GRAPHQL_ENV === "production"
      ? GraphQLModule.forRoot({
          typePaths: ["./**/*.gql"]
        })
      : GraphQLModule.forRoot({
          typePaths: ["./**/*.gql"],
          definitions: {
            path: join(process.cwd(), "src/schemas/graphql.d.ts")
          }
        }),
    UsersModule
  ]
})
export class AppModule {}
