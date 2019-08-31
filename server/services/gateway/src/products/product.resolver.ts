import { Query, Resolver } from "@nestjs/graphql";

import { ProductService } from "./product.service";
import { ProductDTO } from "@commerce/shared";

@Resolver("Product")
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query()
    products(): Promise<ProductDTO[]> {
        return this.productService.get();
    }
}
