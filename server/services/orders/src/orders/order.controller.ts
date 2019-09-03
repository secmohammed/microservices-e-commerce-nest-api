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
    @MessagePattern("destroy-order-by-id")
    destroy({ id, user_id }: { user_id: string; id: string }) {
        return this.orders.destroy({ id, user_id });
    }
    @MessagePattern("create_order")
    store(data: any) {
        return this.orders.create(data);
    }
}
