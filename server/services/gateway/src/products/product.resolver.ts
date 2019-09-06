import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { ProductDTO, UserDTO, config } from "@commerce/shared";
import {
    Query,
    Resolver,
    Context,
    Mutation,
    Args,
    ResolveProperty,
    Parent
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuard } from "../middlewares/auth.guard";
import { CreateProduct } from "./create-product.validation";
import { ProductService } from "./product.service";
import { SellerGuard } from "../middlewares/seller.guard";
import { UserDataLoader } from "../loaders/user.loader";

@Resolver("Product")
export class ProductResolver {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    })
    private client: ClientProxy;

    constructor(
        private readonly productService: ProductService,
        private readonly usersDataLoader: UserDataLoader
    ) {}
    @ResolveProperty("user", () => UserDTO)
    async user(@Parent() product: ProductDTO): Promise<UserDTO> {
        return this.usersDataLoader.load(product.user_id);
    }
    @Query()
    products(): Promise<ProductDTO[]> {
        return this.productService.get();
    }
    @Query()
    async showProduct(@Args("id") id: string) {
        return this.productService.show(id);
    }

    @Mutation()
    @UseGuards(new AuthGuard(), new SellerGuard())
    async createProduct(
        @Args("data") data: CreateProduct,
        @Context("user") user: any
    ) {
        return this.productService.store(data, user.id);
    }
    @Mutation()
    @UseGuards(new AuthGuard(), new SellerGuard())
    async updateProduct(
        @Args("data") data: CreateProduct,
        @Context("user") user: any,
        @Args("id") id: string
    ) {
        return this.productService.update(data, id, user.id);
    }
    @Mutation()
    @UseGuards(new AuthGuard(), new SellerGuard())
    async deleteProduct(@Context("user") user: any, @Args("id") id: string) {
        return this.productService.destroy(id, user.id);
    }
}
