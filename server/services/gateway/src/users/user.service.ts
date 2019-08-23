import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";

import { User } from "../schemas/graphql";

@Injectable()
export class UserService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.USERS_HOST,
      port: Number.parseInt(process.env.USERS_PORT)
    }
  })
  private client: ClientProxy;
  async get(): Promise<User[]> {
    const response = await this.client.send<User[]>("users", []);
    return response.toPromise();
  }
}
