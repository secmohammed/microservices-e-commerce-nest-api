import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { UserDTO, ProductDTO } from "@commerce/shared";

import { config } from "@commerce/shared";
import { redis, redisProductsKey } from "../utils/redis";
import { CreateProduct } from "@commerce/shared";
@Injectable()
export class ProductService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
    }
  })
  private client: ClientProxy;
  async show(id: string): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>("show-product", id)
        .subscribe(product => resolve(product), error => reject(error));
    });
  }
  async get(): Promise<ProductDTO[]> {
    return new Promise((resolve, reject) => {
      // get products through cache.
      redis.get(redisProductsKey, (err, products) => {
        // if products don't persist, retrieve them, and store in redis.
        if (!products) {
          this.client.send<ProductDTO[]>("products", []).subscribe(
            products => {
              redis.set(
                redisProductsKey,
                JSON.stringify(products),
                "EX",
                60 * 60 * 30 // 30 mins until expiration
              );
              return resolve(products);
            },
            error => reject(error)
          );
        }
        // return the parsed products from cache.
        resolve(JSON.parse(products));
      });
    });
  }
  store(data: CreateProduct, id: string): Promise<ProductDTO> {
    // TODO: handle the failure create produc
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>("create-product", {
          ...data,
          user_id: id
        })
        .subscribe(
          product => {
            redis.del(redisProductsKey);
            return resolve(product);
          },
          error => reject(error)
        );
    });
  }
  update(
    data: CreateProduct,
    productId: string,
    id: string
  ): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>("update-product", {
          ...data,
          id: productId,
          user_id: id
        })
        .subscribe(
          product => {
            redis.del(redisProductsKey);
            return resolve(product);
          },
          error => reject(error)
        );
    });
  }
  async fetchProductsByIds(ids: string[]) {
    return this.client
      .send<ProductDTO, string[]>("fetch-products-by-ids", ids)
      .toPromise();
  }
  destroy(productId: string, id: string) {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>("delete-product", {
          id: productId,
          user_id: id
        })
        .subscribe(
          product => {
            redis.del(redisProductsKey);
            return resolve(product);
          },
          error => reject(error)
        );
    });
  }
}
