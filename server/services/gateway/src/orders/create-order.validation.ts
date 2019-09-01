import { IsNotEmpty, Min, IsInt, IsUUID, Validate } from "class-validator";

import { InputType, Field } from "type-graphql";
@InputType()
export class CreateOrder {
    @Min(1)
    @IsNotEmpty()
    @IsInt()
    @Field()
    quantity: number;
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
