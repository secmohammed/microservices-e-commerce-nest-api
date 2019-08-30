import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { ProductDTO } from "@commerce/shared/src/dto/product.dto";
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly products: Repository<ProductEntity>
    ) {}
    async get(data: any = undefined): Promise<ProductDTO[]> {
        const response = await this.products.find(data);
        return response.map(product => product.toResponseObject());
    }
}
