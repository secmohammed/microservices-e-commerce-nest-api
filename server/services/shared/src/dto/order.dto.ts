import { ProductDTO } from "./product.dto";
import { UserDTO } from "./user.dto";
interface ProductOrder {
    product: ProductDTO;
    quantity: number;
}
export interface OrderDTO {
    user: UserDTO;
    totalPrice: number;
    products: ProductOrder[];
    created_at: Date;
}
