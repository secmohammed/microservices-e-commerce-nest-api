import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

import { PaymentEntity } from "./payment.entity";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly payments: Repository<PaymentEntity>
    ) {}
    get(data: any = undefined): Promise<PaymentEntity[]> {
        return this.payments.find(data);
    }
    fetchProductsByIds(ids: Array<string>) {
        return this.payments
            .createQueryBuilder("payments")
            .where(`payments.id IN (:...ids)`, { ids })
            .getMany();
    }
    store(data: any): Promise<PaymentEntity> {
        return this.payments.save(data);
    }
    async update(
        id: string,
        data: any,
        user_id: string
    ): Promise<PaymentEntity> {
        const product = await this.payments.findOneOrFail({ id });
        if (product.user_id === user_id) {
            await this.payments.update({ id }, data);
            return this.payments.findOneOrFail({ id });
        }
        throw new RpcException(
            new NotFoundException("You cannot update what you don't own...")
        );
    }
    async show(id: string): Promise<PaymentEntity> {
        return this.payments.findOneOrFail({ id });
    }
    async destroy(id: string, user_id: string): Promise<PaymentEntity> {
        const product = await this.payments.findOneOrFail({ id });
        if (product.user_id === user_id) {
            await this.payments.delete({ id });
            return product;
        }
        throw new RpcException(
            new NotFoundException("You cannot update what you don't own...")
        );
    }
    async decrementProductsStock(payments) {
        payments.forEach(product => {
            this.payments.decrement(
                { id: product.id },
                "quantity",
                product.quantity
            );
        });
    }
    async incrementProductsStock(payments) {
        payments.forEach(product => {
            this.payments.increment(
                { id: product.id },
                "quantity",
                product.quantity
            );
        });
    }
}
