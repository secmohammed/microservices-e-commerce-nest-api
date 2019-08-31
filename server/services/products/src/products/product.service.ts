import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly products: Repository<ProductEntity>
    ) {}
    get(data: any = undefined): Promise<ProductEntity[]> {
        return this.products.find(data);
    }
    store(data: any): Promise<ProductEntity> {
        return this.products.save(data);
    }
    async update(id: string, data: any, user_id): Promise<ProductEntity> {
        const product = await this.products.findOneOrFail({ id });
        if (product.user_id === user_id) {
            await this.products.update({ id }, data);
            return this.products.findOneOrFail({ id });
        }
        throw new RpcException(
            new NotFoundException("You cannot update what you don't own...")
        );
    }
}
