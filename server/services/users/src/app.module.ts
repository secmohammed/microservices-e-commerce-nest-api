import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
    imports: [TypeOrmModule.forRoot(), UsersModule]
})
export class AppModule {}
