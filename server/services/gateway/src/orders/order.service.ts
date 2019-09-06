import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { UserDTO, ProductDTO, OrderDTO } from "@commerce/shared";

import { config } from "@commerce/shared";
import { redis, redisProductsKey } from "../utils/redis";
import { CreateProduct } from "@commerce/shared";
@Injectable()
export class OrderService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
    }
  })
  private client: ClientProxy;
  indexOrdersByUser(user_id: string): Promise<OrderDTO[]> {
    return new Promise((resolve, reject) => {
      this.client.send("index-orders", user_id).subscribe(orders => {
        return resolve(orders);
      });
    });
  }
  async destroyUserOrder(order_id: any, user_id): Promise<OrderDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send("destroy-order-by-id", {
          id: order_id,
          user_id
        })
        .subscribe(async order => {
          // fire an event that order is deleted to increase the product's quantity.
          this.client
            .emit("order_deleted", order.products)
            .subscribe(() => resolve(order));
        });
    });
  }
  store(products: any, user_id, fetchedProducts): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      const mappedProducts = fetchedProducts
        .map(product => {
          // find the product which user passed, to retrieve the ordered quantity.
          let p = products.find(p => p.id === product.id);
          if (p) {
            return { ...product, ordered_quantity: p.quantity };
          }
          return product;
        })
        .filter(product => !!product.ordered_quantity);
      this.client
        .send("create_order", {
          products: mappedProducts,
          user_id
        })
        .subscribe(
          order => {
            // fire an event to reduce the quantity of the products.
            this.client
              .emit("order_created", products)
              .subscribe(() => {}, () => {}, () => resolve(order)); // resolve on completion
          },
          error => reject(error)
        );
    });
  }
}
