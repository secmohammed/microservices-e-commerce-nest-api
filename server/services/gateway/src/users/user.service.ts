import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { UserDTO, RegisterUser, LoginUser } from "@commerce/shared";
import { ObjectID } from "typeorm";
import { config } from "../config";

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
  async login(data: LoginUser): Promise<UserDTO> {
    const response = await this.client.send<UserDTO>("login-user", data);
    return response.toPromise();
  }
  async register(data: RegisterUser): Promise<UserDTO> {
    const response = this.client.send<UserDTO>("register-user", data);
    return response.toPromise();
  }
  async me(id: ObjectID) {
    const response = this.client.send<UserDTO>("current-loggedin-user", id);
    return response.toPromise();
  }
}
