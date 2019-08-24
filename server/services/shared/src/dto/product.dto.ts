import { UserDTO } from "./user.dto";
export interface ProductDTO {
    user: UserDTO;
    title: string;
    description: string;
    image: string;
    price: string;
    created_at: Date;
}
