import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { ProductEntity } from "./product.entity";
import { ProductService } from "./product.service";
import { MessagePattern } from "@nestjs/microservices";

@Resolver(() => ProductEntity)
export class ProductResolver {
    constructor(private readonly users: ProductService) {}
    @MessagePattern("products")
    @Query(() => [ProductEntity], { name: "products" })
    index() {}
}
