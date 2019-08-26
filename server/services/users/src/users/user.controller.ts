import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
@Controller("users")
export class UserController {
    constructor(private readonly users: UserService) {}
    @MessagePattern("users")
    index() {
        return this.users.get();
    }
}
