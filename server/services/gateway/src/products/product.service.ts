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
      this.client.send<ProductDTO>("show_product", id).subscribe(
        product => {
          this.client
            .send<UserDTO[]>("fetch-users-by-ids", product.user_id)
            .subscribe(
              ([user]) => {
                product.user = user;

                delete product.user_id;

                resolve(product);
              },
              error => reject(error)
            );
        },
        error => reject(error)
      );
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
              // get users by ids in products.
              const userIds = products.map(product => product.user_id);
              this.client
                .send<UserDTO[]>("fetch-users-by-ids", userIds)
                .subscribe(
                  users => {
                    // map users to their products.
                    const mappedProducts = products.map(product => {
                      product = {
                        ...product,
                        user: users.find(user => user.id === product.user_id)
                      };
                      delete product.user_id;
                      return product;
                    });
                    redis.set(
                      redisProductsKey,
                      JSON.stringify(mappedProducts),
                      "EX",
                      60 * 60 * 30 // 30 mins until expiration
                    );
                    resolve(mappedProducts);
                  },
                  error => reject(error)
                );
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
        .send<ProductDTO>("create_product", {
          ...data,
          user_id: id
        })
        .subscribe(
          product => {
            this.client
              .send<UserDTO[]>("fetch-users-by-ids", [id])
              .subscribe(([user]) => {
                product.user = user;
                delete product.user_id;
                redis.del(redisProductsKey);
                resolve(product);
              });
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
        .send<ProductDTO>("update_product", {
          ...data,
          id: productId,
          user_id: id
        })
        .subscribe(
          product => {
            this.client
              .send<UserDTO[]>("fetch-users-by-ids", [id])
              .subscribe(([user]) => {
                product.user = user;
                delete product.user_id;
                redis.del(redisProductsKey);
                resolve(product);
              });
          },
          error => reject(error)
        );
    });
  }
  destroy(productId: string, id: string) {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>("delete_product", {
          id: productId,
          user_id: id
        })
        .subscribe(
          product => {
            this.client
              .send<UserDTO[]>("fetch-users-by-ids", [id])
              .subscribe(([user]) => {
                product.user = user;
                delete product.user_id;
                redis.del(redisProductsKey);
                resolve(product);
              });
          },
          error => reject(error)
        );
    });
  }
}
