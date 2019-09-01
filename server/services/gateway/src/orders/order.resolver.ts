import { Resolver, Context, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuard } from "../middlewares/auth.guard";
import { CreateOrder } from "./create-order.validation";
import { OrderService } from "./order.service";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { config, ProductDTO } from "@commerce/shared";

@Resolver("Order")
export class OrderResolver {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    })
    private client: ClientProxy;

    constructor(private readonly orderService: OrderService) {}

    @Mutation()
    @UseGuards(new AuthGuard())
    createOrder(
        @Args("products") products: CreateOrder[],
        @Context("user") user: any
    ): Promise<ProductDTO> {
        return new Promise((resolve, reject) => {
            this.client
                .send<ProductDTO[]>(
                    "fetch-products-by-ids",
                    products.map(product => product.id)
                )
                .subscribe(
                    async fetchedProducts => {
                        const filteredProducts = products.filter(product => {
                            const p = fetchedProducts.find(
                                p => p.id === product.id
                            );
                            return p.quantity > product.quantity;
                        });
                        // there is something wrong with the quantity of passed products.
                        if (filteredProducts.length != products.length) {
                            return reject(
                                "Products are out of stock at the moment, try with lower stock."
                            );
                        }
                        return resolve(
                            await this.orderService.store(products, user.id)
                        );
                    },
                    error => reject(error)
                );
        });
    }
}
