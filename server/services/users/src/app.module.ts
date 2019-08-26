import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: "default",
            type: "mongodb",
            host: "localhost",
            database: "users-module",
            entities: ["dist/**/*.entity.js"],
            port: 27017,
            useNewUrlParser: true,
            logging: true
        }),
        UsersModule
    ]
})
export class AppModule {}
