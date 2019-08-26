import { AddressDTO } from "./address.dto";
export interface UserDTO {
    id: string;
    name: string;
    readonly password: string;
    seller: boolean;
    address: AddressDTO;
    created_at: Date;
}
