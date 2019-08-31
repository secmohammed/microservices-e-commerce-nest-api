import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import { UserDTO, RegisterUser, LoginUser } from "@commerce/shared";
import { ObjectID } from "typeorm";
import { config } from "@commerce/shared";

@Injectable()
export class UserService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`
    }
  })
  private client: ClientProxy;
  async get(): Promise<UserDTO[]> {
    const response = await this.client.send<UserDTO[]>("users", []);
    return response.toPromise();
  }
  async login(data: LoginUser): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      this.client.send<UserDTO>("login-user", data).subscribe(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  async register(data: RegisterUser): Promise<UserDTO> {
    const response = this.client.send<UserDTO>("register-user", data);
    return response.toPromise();
  }
  me(id: ObjectID) {
    return new Promise((resolve, reject) => {
      this.client.send<UserDTO>("current-loggedin-user", id).subscribe(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
