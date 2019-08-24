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
}
