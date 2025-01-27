import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Users full name.',
    example: 'Juan Pérez',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Users nickname. Must be between 3 and 255 characters.',
    example: 'juanchi123',
    type: String,
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  nickName: string;

  @ApiProperty({
    description: 'Users e-mail address. Must be a valid address.',
    example: 'juan.perez@example.com',
    type: String,
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Users password. Must be between 6 and 255 characters.',
    example: 'mypassword123',
    type: String,
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;
}

export class UserUpdateDto extends PartialType(UserDto) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}