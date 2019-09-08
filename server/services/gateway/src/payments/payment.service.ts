import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { PaymentCardDTO, UserDTO, config } from "@commerce/shared";

import { CreatePaymentCard } from "./create-payment-card.validation";
import { redis, redisProductsKey } from "../utils/redis";
@Injectable()
export class PaymentCardService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
    }
  })
  private client: ClientProxy;
  async get(user_id: string): Promise<PaymentCardDTO[]> {
    return this.client
      .send<PaymentCardDTO[]>("index-user-payment-cards", user_id)
      .toPromise();
  }
  async charge(order, user) {
    return this.client
      .send("create-charge", {
        total_price: order.total_price,
        user
      })
      .toPromise();
  }
  async store(data: CreatePaymentCard, user: UserDTO): Promise<PaymentCardDTO> {
    return this.client
      .send<PaymentCardDTO, { data: CreatePaymentCard; user: UserDTO }>(
        "create-payment",
        {
          data,
          user
        }
      )
      .toPromise();
  }
  async show(id, user_id) {
    return this.client
      .send("show-user-payment-card", {
        id,
        user_id
      })
      .toPromise();
  }
  destroy(id: string, user_id: string) {
    return this.client
      .send<PaymentCardDTO>("delete-user-payment", {
        id,
        user_id
      })
      .toPromise();
  }
}
