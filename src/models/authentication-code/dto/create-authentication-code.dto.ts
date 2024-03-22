import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthenticationCodeDto {

    @IsString()
    @MinLength(1)
    userId: string;

    @IsString()
    @MaxLength(6)
    @MinLength(6)
    code: string;

}
