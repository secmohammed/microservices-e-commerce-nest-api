import { Controller } from "@nestjs/common";
import { MessagePattern, EventPattern } from "@nestjs/microservices";

import { PaymentEntity } from "./payment.entity";
import { PaymentService } from "./payment.service";

@Controller("payments")
export class PaymentController {
    constructor(private readonly payments: PaymentService) {}

    @MessagePattern("payments")
    index(data: any = undefined): Promise<PaymentEntity[]> {
        return this.payments.get(data);
    }

    @MessagePattern("create_payment")
    store(data: any): Promise<PaymentEntity> {
        return this.payments.store(data);
    }

    @MessagePattern("update_payment")
    update({
        id,
        title,
        description,
        image,
        price,
        user_id
    }: any): Promise<PaymentEntity> {
        return this.payments.update(
            id,
            { title, description, image, price },
            user_id
        );
    }

    @MessagePattern("show_payment")
    show(id: string): Promise<PaymentEntity> {
        return this.payments.show(id);
    }
    @MessagePattern("fetch-payments-by-ids")
    fetchPaymentsByIds(ids: Array<string>) {
        return this.payments.fetchPaymentsByIds(ids);
    }
    @EventPattern("order_deleted")
    async handleOrderDeleted(
        payments: Array<{ id: string; quantity: number }>
    ) {
        this.payments.incrementPaymentsStock(payments);
    }
    @EventPattern("order_created")
    async handleOrderCreated(
        payments: Array<{ id: string; quantity: number }>
    ) {
        this.payments.decrementPaymentsStock(payments);
    }

    @MessagePattern("delete_payment")
    destroy({ id, user_id }: { id: string; user_id: string }) {
        return this.payments.destroy(id, user_id);
    }
}
