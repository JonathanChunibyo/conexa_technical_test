import { IsOptional, IsString, Matches, MinLength } from "class-validator";
import * as message from '../../../errors/messageModel.errors.json';

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    lastName?: string;

    @IsString()
    @MinLength(1)
    nickName: string;

    @IsString()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
       message: message.invalidPassword
    })
    password: string;

}
