import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ProductDTO } from "@commerce/shared";
import DataLoader = require("dataloader"); // commonjs module

import { IDataLoader } from "../contracts/nest-dataloader";
import { ProductService } from "../products/product.service";

@Injectable()
export class OrderProductDataLoader implements IDataLoader<string, ProductDTO> {
    constructor(private readonly dataLoader: DataLoader<any, any>) {}

    public static async create(
        productService: ProductService
    ): Promise<OrderProductDataLoader> {
        const dataloader = new DataLoader<string, ProductDTO>(
            async (products: any) => {
                const ids = products.map(product => product.id).flat();
                let fetchedProducts = await productService.fetchProductsByIds(
                    ids
                );
                return products.map(product => {
                    return {
                        product: fetchedProducts.find(
                            entity => entity.id === product.id
                        ),
                        quantity_ordered: products.find(
                            p => p.id === product.id
                        ).quantity
                    };
                });
            }
        );
        return new OrderProductDataLoader(dataloader);
    }
    public async load(id: string) {
        return this.dataLoader.load(id);
    }
    public async loadMany(products: any[]) {
        return this.dataLoader.loadMany(products);
    }
}
