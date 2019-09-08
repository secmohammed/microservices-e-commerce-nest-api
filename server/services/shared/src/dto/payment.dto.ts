import { UserDTO } from "./user.dto";
export interface PaymentCardDTO {
    id: string;
    user: UserDTO;
    last_four: string;
    brand: string;
    default: boolean;
    provider_id: string;
    created_at: Date;
}
