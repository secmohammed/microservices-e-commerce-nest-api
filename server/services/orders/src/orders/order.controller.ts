import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { MessagePattern } from "@nestjs/microservices";
@Controller("orders")
export class OrderController {
    constructor(private readonly orders: OrderService) {}
    @MessagePattern("orders")
    index() {
        return this.orders.get();
    }
}
