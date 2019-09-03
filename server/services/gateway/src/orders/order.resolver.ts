import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import {
    Resolver,
    Context,
    Mutation,
    Args,
    Query,
    ResolveProperty,
    Parent
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { config, ProductDTO, OrderDTO, UserDTO } from "@commerce/shared";

import { AuthGuard } from "../middlewares/auth.guard";
import { CreateOrder } from "./create-order.validation";
import { OrderService } from "./order.service";
import { UUID } from "../shared/validation/uuid.validation";

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
    @ResolveProperty("user")
    async user(@Parent() order): Promise<UserDTO> {
        const user = await this.client
            .send("fetch-user-by-id", order.user_id)
            .toPromise();
        return user;
    }
    @ResolveProperty()
    products(@Parent() order): Promise<ProductDTO[]> {
        return new Promise((resolve, reject) => {
            this.client
                .send(
                    "fetch-products-by-ids",
                    order.products.map(product => product.id)
                )
                .subscribe(products => {
                    this.client
                        .send(
                            "fetch-users-by-ids",
                            products.map(product => product.user_id)
                        )
                        .subscribe(users => {
                            console.log(users, products, order);
                            products = products.map(product => {
                                product = {
                                    ...product,
                                    user: users.find(
                                        user => user.id === product.user_id
                                    )
                                };
                                delete product.user_id;
                                return {
                                    product,
                                    quantity_ordered: order.products.find(
                                        p => p.id == product.id
                                    ).quantity
                                };
                            });
                            return resolve(products);
                        });
                });
        });
    }
    @Query()
    @UseGuards(new AuthGuard())
    orders(@Context("user") user: any): Promise<OrderDTO[]> {
        return this.orderService.indexOrdersByUser(user.id);
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    deleteOrder(@Args("order") { id }: UUID, @Context("user") user: any) {
        return this.orderService.destroyUserOrder(id, user.id);
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    createOrder(
        @Args("products") products: CreateOrder[],
        @Context("user") user: any
    ): Promise<ProductDTO> {
        return new Promise((resolve, reject) => {
            // fetch products user is trying to purchase to check on the quantity.
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
                            return p.quantity >= product.quantity;
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
