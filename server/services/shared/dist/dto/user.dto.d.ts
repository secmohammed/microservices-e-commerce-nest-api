import { AddressDTO } from "./address.dto";
export interface UserDTO {
    name: string;
    readonly password: string;
    seller: boolean;
    address: AddressDTO;
    created_at: Date;
}
