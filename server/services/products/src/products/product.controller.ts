import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { ProductService } from "./product.service";
import { ProductDTO } from "@commerce/shared";
@Controller("products")
export class ProductController {
    constructor(private readonly products: ProductService) {}
    @MessagePattern("products")
    index(): Promise<ProductDTO[]> {
        return this.products.get();
    }
}
