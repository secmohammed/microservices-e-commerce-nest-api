import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsUrl,
    Min,
    Max,
    IsInt
} from "class-validator";
import { InputType, Field } from "type-graphql";
@InputType()
export class CreateProduct {
    @Min(1)
    @Max(999)
    @IsNotEmpty()
    @IsInt()
    @Field()
    price: number;

    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @Field()
    title: string;
    @MinLength(32)
    @MaxLength(255)
    @IsNotEmpty()
    @Field()
    description: string;
    @IsUrl()
    @IsNotEmpty()
    image: string;
}
