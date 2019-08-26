import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";

import { User } from "../schemas/graphql";
import { UserDTO } from "@commerce/shared";
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
  async get(): Promise<UserDTO[]> {
    const response = await this.client.send<UserDTO[]>("users", []);
    return response.toPromise();
  }
}
