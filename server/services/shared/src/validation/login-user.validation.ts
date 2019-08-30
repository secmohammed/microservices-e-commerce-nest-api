import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";
import { InputType, Field } from "type-graphql";
@InputType()
export class LoginUser {
    @IsEmail()
    @IsNotEmpty()
    @Field()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Field()
    password: string;
}
