import { CreateProduct, ProductDTO } from "@commerce/shared";
import { Query, Resolver, Context, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuard } from "../middlewares/auth.guard";
import { ProductService } from "./product.service";
import { SellerGuard } from "../middlewares/seller.guard";

@Resolver("Product")
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query()
    products(): Promise<ProductDTO[]> {
        return this.productService.get();
    }
    @Mutation()
    @UseGuards(new AuthGuard(), new SellerGuard())
    async createProduct(
        @Args("data") data: CreateProduct,
        @Context("user") user: any
    ) {
        return this.productService.store(data, user.id);
    }
}
