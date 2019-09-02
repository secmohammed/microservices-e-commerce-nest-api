import { ProductDTO } from "@commerce/shared";
import {
    Query,
    Resolver,
    Context,
    Mutation,
    Args,
    Parent,
    ResolveProperty
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CreateProduct } from "./create-product.validation";
import { AuthGuard } from "../middlewares/auth.guard";
import { ProductService } from "./product.service";
import { SellerGuard } from "../middlewares/seller.guard";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { config, UserDTO } from "@commerce/shared";
@Resolver("Product")
export class ProductResolver {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
        }
    })
    private client: ClientProxy;

    constructor(private readonly productService: ProductService) {}
    @ResolveProperty("user")
    async user(@Parent() product): Promise<UserDTO> {
        if (product.user) {
            return product.user;
        }
        const user = await this.client
            .send("fetch-user-by-id", product.user_id)
            .toPromise();
        return user;
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
