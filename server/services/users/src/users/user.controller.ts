import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
import { LoginUser, RegisterUser } from "@commerce/shared";
@Controller("users")
export class UserController {
    constructor(private readonly users: UserService) {}
    @MessagePattern("users")
    index() {
        return this.users.get();
    }
    @MessagePattern("login-user")
    login(data: LoginUser) {
        return this.users.login(data);
    }
    @MessagePattern("register-user")
    register(data: RegisterUser) {
        return this.users.register(data);
    }
}
