import { IsObject, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class UserCredentialValidationDTO {
    @IsObject()
    user: {
        password: string,
        id: string,
        name: string,
        lastName: string,
        nickName: string,

    };
}
