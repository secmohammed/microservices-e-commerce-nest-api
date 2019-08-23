import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity as User } from "./user.entity";
import { Repository, FindManyOptions } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ) {}
    async get(): Promise<{}[]> {
        return [
            {
                id: "ondoqwndwq",
                username: "mohammed"
            },
            {
                id: "odnqowndwq",
                username: "osama"
            }
        ];
    }
}
