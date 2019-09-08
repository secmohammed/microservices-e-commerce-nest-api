import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import {
    RpcException,
    Client,
    Transport,
    ClientProxy
} from "@nestjs/microservices";
import { PaymentCardDTO, config } from "@commerce/shared";

import { PaymentEntity } from "./payment.entity";
import { stripe } from "../utils/stripe";

@Injectable()
export class PaymentService {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    })
    private client: ClientProxy;

    constructor(
        @InjectRepository(PaymentEntity)
        private readonly payments: Repository<PaymentEntity>
    ) {}
    async findByUserId(user_id) {
        return this.payments.findOneOrFail({ where: { user_id } });
    }
    async store(
        data: {
            token_id: string;
            last_four: string;
            provider_id: string;
            brand: string;
            default: boolean;
        },
        user
    ): Promise<PaymentCardDTO> {
        // if user sets the payment card we are about to store to default, set others to false.
        if (data.default) {
            await this.payments.update(
                {
                    user_id: user.id
                },
                { default: false }
            );
        }
        const paymentData = {
            last_four: data.last_four,
            provider_id: data.provider_id,
            default: data.default,
            brad: data.brand,
            user_id: user.id
        };
        // store the payment method to our database alongside with token.
        const payment = await this.payments.save(paymentData);

        // check if user has gateway_customer_id, if user doesn't have one, create one using stripe.
        if (!user.gateway_customer_id) {
            let address = {
                line1: user.address.address_1,
                line2: user.address.address_2,
                city: user.address.city,
                state: user.address.state,
                country: user.address.country,
                postal_code: user.address.zip
            };
            // fetch user addresses, email, provider_id, name and create a customer.
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                source: data.token_id,
                address
            });
            // attach customer id to the user.gateway_customer_id
            this.client
                .emit("customer_created", {
                    user_id: user.id,
                    gateway_customer_id: customer.id
                })
                .subscribe(() => {});
        }
        delete payment.user_id;
        // @ts-ignore
        payment.user = user;
        return payment;
    }
    async get(user_id: string): Promise<PaymentEntity[]> {
        return this.payments.find({ user_id });
    }
    async show(id: string, user_id: string): Promise<PaymentEntity> {
        return this.payments.findOneOrFail({ id, user_id });
    }
    async destroy(id: string, user_id: string): Promise<PaymentEntity> {
        const paymentCard = await this.payments.findOneOrFail({ id });
        if (paymentCard.user_id === user_id) {
            await this.payments.delete({ id });
            return paymentCard;
        }
        throw new RpcException(
            new NotFoundException("You cannot update what you don't own...")
        );
    }
}
