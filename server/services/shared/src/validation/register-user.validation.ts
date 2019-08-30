import { IsNotEmpty, MinLength, MaxLength, IsBoolean } from "class-validator";
import { LoginUser } from "./login-user.validation";
import { InputType, Field } from "type-graphql";
@InputType()
export class RegisterUser extends LoginUser {
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @Field()
    name: string;

    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @Field()
    password_confirmation: string;
    @IsNotEmpty()
    @IsBoolean()
    @Field()
    seller: boolean;
}
