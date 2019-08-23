import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository, FindManyOptions } from "typeorm";
interface Product {
    name: string;
    price: number;
}

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly products: Repository<ProductEntity>
    ) {}
    index(data: any): Array<Product> {
        console.log(data);
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
