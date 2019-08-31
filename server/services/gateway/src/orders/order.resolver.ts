import { ProductDTO } from "@commerce/shared";
import { Query, Resolver, Context, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CreateProduct } from "./create-product.validation";
import { AuthGuard } from "../middlewares/auth.guard";
import { OrderService } from "./order.service";
import { SellerGuard } from "../middlewares/seller.guard";

@Resolver("Order")
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}
}
