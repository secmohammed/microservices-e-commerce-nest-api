import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { OrderEntity as Order } from "./order.entity";
import { OrderDTO } from "@commerce/shared";
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orders: Repository<Order>
    ) {}
    async get(user_id: string): Promise<Order[]> {
        return this.orders.find({ user_id });
    }
    async markOrderStatus(id, status) {
        return this.orders.update(id, {
            status
        });
    }
    async findByIdAndUserId(id, user_id) {
        return this.orders.findOneOrFail({ id, user_id });
    }
    async create({ products, user_id }): Promise<Order> {
        const INITIAL_VALUE = 0;
        const total_price = products.reduce(
            (accumulator, product) =>
                accumulator + product.ordered_quantity * product.price,
            INITIAL_VALUE
        );
        const databaseProducts = products.map(product => {
            return { id: product.id, quantity: product.ordered_quantity };
        });
        const actualProducts = products.map(product => {
            product.quantity = product.quantity - product.ordered_quantity;
            delete product.ordered_quantity;
            return { ...product };
        });
        products = databaseProducts;

        const order = await this.orders.create({
            products,
            user_id,
            total_price
        });
        await this.orders.save(order);
        order.products = actualProducts;
        return order;
    }
    async destroy({ id, user_id }) {
        // find the order.
        const order = await this.orders.findOneOrFail({
            where: { id, user_id }
        });
        await this.orders.delete({ id, user_id });
        // return the order to fire an event increasing the stock of related products to this order at the gateway.
        return order;
    }
}
