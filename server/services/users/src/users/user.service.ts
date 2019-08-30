import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { LoginUser, RegisterUser, UserDTO } from "@commerce/shared";
import { Repository } from "typeorm";
import { UserEntity as User } from "./user.entity";
import { compareSync } from "bcryptjs";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ) {}
    async me({ id }: any): Promise<UserDTO> {
        const user = await this.users.findOneOrFail(id);
        return user.toResponseObject(false);
    }
    async get(page: number = 1): Promise<UserDTO[]> {
        const options = {
            relations: ["address"],
            skip: 25 * (page - 1),
            take: 25
        };
        return this.users.find(options);
    }
    async login({ email, password }: LoginUser): Promise<UserDTO> {
        const user = await this.users.findOneOrFail({
            where: { email }
        });
        if (!compareSync(password, user.password)) {
            throw new RpcException(
                new NotFoundException("Invalid Credentials...")
            );
        }
        return user.toResponseObject();
    }
    async register({
        email,
        password,
        password_confirmation,
        seller,
        name
    }: RegisterUser): Promise<UserDTO> {
        if (password != password_confirmation) {
            throw new RpcException(
                new NotFoundException(
                    "Password and password_confirmation should match"
                )
            );
        }

        const count = await this.users.count({
            where: {
                email
            }
        });
        if (count) {
            throw new RpcException(
                new NotFoundException(
                    "email exists, please pick up another one."
                )
            );
        }
        let user = await this.users.create({
            name,
            seller,
            email,
            password
        });
        user = await this.users.save(user);
        return user.toResponseObject();
    }
}
