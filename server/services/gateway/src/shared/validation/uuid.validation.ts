import { IsUUID, IsNotEmpty } from "class-validator";

export class UUID {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
