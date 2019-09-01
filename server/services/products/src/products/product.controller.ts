import { Controller } from "@nestjs/common";
import { MessagePattern, EventPattern } from "@nestjs/microservices";

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

    @MessagePattern("update_product")
    update({
        id,
        title,
        description,
        image,
        price,
        user_id
    }: any): Promise<ProductEntity> {
        return this.products.update(
            id,
            { title, description, image, price },
            user_id
        );
    }

    @MessagePattern("show_product")
    show(id: string): Promise<ProductEntity> {
        return this.products.show(id);
    }
    @MessagePattern("fetch-products-by-ids")
    fetchProductsByIds(ids: Array<string>) {
        return this.products.fetchProductsByIds(ids);
    }
    @EventPattern("order_created")
    async handleOrderCreated(
        products: Array<{ id: string; quantity: number }>
    ) {
        this.products.decrementProductsStock(products);
    }

    @MessagePattern("delete_product")
    destroy({ id, user_id }: { id: string; user_id: string }) {
        return this.products.destroy(id, user_id);
    }
}
