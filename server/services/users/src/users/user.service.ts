import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity as User } from "./user.entity";
import { Repository, FindManyOptions } from "typeorm";
import { UserDTO } from "@commerce/shared";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ) {}
    async get(): Promise<UserDTO[]> {
        return [
            {
                id: "donqwodnqwdwq",
                name: "qondoqwndqwd",
                password: "qodnoqwndqw",
                seller: false,
                address: {
                    address_1: "stringdadsa",
                    address_2: "stringdasdas",
                    city: "stringdasdas",
                    state: "dasdasdasdas",
                    country: "ondqowndqwd",
                    zip: 31
                },
                created_at: new Date()
            },
            {
                id: "donqwodnqwdwq",
                name: "qondoqwndqwd",
                password: "qodnoqwndqw",
                seller: false,
                address: {
                    address_1: "stringdadsa",
                    address_2: "stringdasdas",
                    city: "stringdasdas",
                    state: "dasdasdasdas",
                    country: "ondqowndqwd",
                    zip: 31
                },
                created_at: new Date()
            }
        ];
    }
}
