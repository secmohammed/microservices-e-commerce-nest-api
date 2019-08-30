import { AddressDTO } from "./address.dto";
import { ObjectID } from "typeorm";

export interface UserDTO {
    id: ObjectID;
    name: string;
    readonly password: string;
    seller: boolean;
    address: AddressDTO;
    created_at: Date;
}
