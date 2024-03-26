// Libraries
import { IsString, MaxLength, MinLength } from "class-validator";
import { DeepPartial } from "typeorm";

export class CreateAuthenticationCodeDto {

    userId: DeepPartial<PartialUser>;

    @IsString()
    @MaxLength(6)
    @MinLength(6)
    code: string;

}

interface PartialUser {
    id: string;
}