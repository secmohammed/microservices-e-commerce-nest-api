import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
@Injectable()
export class AppService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.PRODUCTS_HOST,
      port: Number.parseInt(process.env.PRODUCTS_PORT),
    },
  })
  private client: ClientProxy;
  products() {
    return this.client.send<string, any>('products', []);
  }
}
