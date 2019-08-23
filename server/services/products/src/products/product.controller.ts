import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { Controller } from "@nestjs/common";
import { ProductService, Product } from "./product.service";
import { MessagePattern } from "@nestjs/microservices";
@Controller("products")
export class ProductController {
    constructor(private readonly products: ProductService) {}
    @MessagePattern("products")
    index(): Product[] {
        return this.products.get();
    }
}
