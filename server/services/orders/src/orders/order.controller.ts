import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { MessagePattern } from "@nestjs/microservices";
@Controller("orders")
export class OrderController {
    constructor(private readonly orders: OrderService) {}
    @MessagePattern("index-orders")
    index(user_id: string) {
        return this.orders.get(user_id);
    }
    @MessagePattern("create_order")
    store(data: any) {
        return this.orders.create(data);
    }
}
