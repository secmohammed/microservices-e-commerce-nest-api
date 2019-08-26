import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { config } from "../config";

import { UserDTO } from "@commerce/shared";
@Injectable()
export class UserService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: config.USERS_HOST,
      port: parseInt(config.USERS_PORT as string)
    }
  })
  private client: ClientProxy;
  async get(): Promise<UserDTO[]> {
    const response = await this.client.send<UserDTO[]>("users", []);
    return response.toPromise();
  }
}
