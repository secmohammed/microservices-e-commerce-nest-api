import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { ProductEntity } from "./product.entity";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
    constructor(private readonly products: ProductService) {}
    @MessagePattern("products")
    index(data: any = undefined): Promise<ProductEntity[]> {
        return this.products.get(data);
    }
    @MessagePattern("create_product")
    store(data: any): Promise<ProductEntity> {
        return this.products.store(data);
    }
}
