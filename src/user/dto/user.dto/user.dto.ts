import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    nickName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    password: string;

    @IsBoolean()
    isState: boolean;
}
