import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository, FindManyOptions } from "typeorm";
export interface Product {
    name: string;
    price: number;
}

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly products: Repository<ProductEntity>
    ) {}
    get(data: any = undefined): Array<Product> {
        return [
            {
                name: "Macbook pro 2016",
                price: 30.0
            },
            {
                name: "Macbook Pro 2017",
                price: 30.0
            }
        ];
    }
}
