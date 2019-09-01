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
    async get(): Promise<OrderDTO> {
        return;
    }
    async create({ products, user_id }) {
        const INITIAL_VALUE = 0;
        const total_price = products.reduce(
            (accumulator, product) =>
                accumulator + product.ordered_quantity * product.price,
            INITIAL_VALUE
        );
        products = products.map(product => {
            return { id: product.id, quantity: product.ordered_quantity };
        });

        this.orders.save({
            products,
            user_id,
            total_price
        });
    }
}
