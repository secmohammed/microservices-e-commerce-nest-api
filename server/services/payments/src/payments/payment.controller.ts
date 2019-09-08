import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

// import { PaymentEntity } from "./payment.entity";
import { PaymentService } from "./payment.service";
import { stripe } from "../utils/stripe";
@Controller("payments")
export class PaymentController {
    constructor(private readonly payments: PaymentService) {}
    @MessagePattern("index-user-payment-cards")
    index(user_id: string) {
        return this.payments.get(user_id);
    }
    @MessagePattern("show-user-payment-card")
    show({ id, user_id }) {
        return this.payments.show(id, user_id);
    }
    @MessagePattern("create-payment")
    store({ data, user }) {
        return this.payments.store(data, user);
    }
    @MessagePattern("delete-user-payment")
    destroy({ id, user_id }) {
        return this.payments.destroy(id, user_id);
    }
    @MessagePattern("create-charge")
    async createCharge({ total_price, user }) {
        const paymentCard = await this.payments.findByUserId(user.id);
        return stripe.charges.create({
            amount: total_price, // in cents.
            currency: "usd",
            customer: user.gateway_customer_id,
            source: paymentCard.provider_id, // card_id
            shipping: {
                name: user.name,
                address: {
                    line1: user.address.address_1,
                    line2: user.address.address_2,
                    city: user.address.city,
                    state: user.address.state,
                    country: user.address.country,
                    postal_code: user.address.zip
                }
            }
        });
    }
}
