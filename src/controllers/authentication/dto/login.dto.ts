import { IsObject, IsOptional, IsString, Matches, MinLength } from "class-validator";
import * as message from '../../../errors/messageModel.errors.json';

export class LoginDTO {
    @IsString()
    @MinLength(1)
    @IsOptional()
    nickName?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    email?: string;

    @IsString()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
       message: message.invalidPassword
    })
    password: string;

    @IsObject()
    user: {
        password: string,
        id: string
    };
}
