import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { ProductDTO, UserDTO, config } from "@commerce/shared";
import {
    Query,
    Resolver,
    Context,
    Mutation,
    Args,
    Parent
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuard } from "../middlewares/auth.guard";
import { CreatePaymentCard } from "./create-payment-card.validation";
import { PaymentCardService } from "./payment.service";
import { UserDataLoader } from "../loaders/user.loader";
import { PaymentCardDTO } from "@commerce/shared";
@Resolver("PaymentCard")
export class PaymentCardResolver {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    })
    private client: ClientProxy;

    constructor(private readonly paymentCardsService: PaymentCardService) {}
    @Query()
    @UseGuards(new AuthGuard())
    async indexUserPaymentCards(@Context("user") user: any) {
        return this.paymentCardsService.get(user.id);
    }
    @Query()
    @UseGuards(new AuthGuard())
    async showPaymentCard(@Args("id") id: string, @Context("user") user: any) {
        return this.paymentCardsService.show(id, user.id);
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    async deletePaymentCard(
        @Args("id") id: string,
        @Context("user") user: any
    ) {
        return this.paymentCardsService.destroy(id, user.id);
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    async createPaymentCard(
        @Args("data") data: CreatePaymentCard,
        @Context("user") user: any
    ) {
        user = await this.client
            .send("current-loggedin-user", user.id)
            .toPromise();
        return this.paymentCardsService.store(data, user);
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    async createChargeForUser(
        @Args("orderId") orderId: string,
        @Context("user") user: any
    ) {
        user = await this.client
            .send("current-loggedin-user", user.id)
            .toPromise();
        let order = await this.client
            .send("show-user-order", {
                id: orderId,
                user_id: user.id
            })
            .toPromise();
        const charge = await this.paymentCardsService.charge(order, user);

        this.client
            .emit("order_charged", {
                id: orderId,
                status: charge.status
            })
            .subscribe(() => {});
        order.status = charge.status;
        order.user = user;
        return order;
    }
}
