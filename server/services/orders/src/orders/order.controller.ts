import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { MessagePattern, EventPattern } from "@nestjs/microservices";
@Controller("orders")
export class OrderController {
    constructor(private readonly orders: OrderService) {}
    @MessagePattern("index-orders")
    index(user_id: string) {
        return this.orders.get(user_id);
    }
    @MessagePattern("show-user-order")
    show({ id, user_id }: { id: string; user_id: string }) {
        console.log(id, user_id);
        return this.orders.findByIdAndUserId(id, user_id);
    }
    @MessagePattern("destroy-order-by-id")
    destroy({ id, user_id }: { user_id: string; id: string }) {
        return this.orders.destroy({ id, user_id });
    }
    @MessagePattern("create_order")
    store(data: any) {
        return this.orders.create(data);
    }
    @EventPattern("order_charged")
    markOrderStatus({ id, status }) {
        return this.orders.markOrderStatus(id, status);
    }
}
