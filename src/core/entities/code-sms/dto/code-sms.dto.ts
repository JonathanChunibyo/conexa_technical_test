import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsUUID,
  IsOptional,
} from "class-validator";
import { UserEntity } from "src/core/entities/user/entities/user.entity";

export class CodeSmsDto {
  @ApiProperty({
    description: "Unique code for the entity.",
    example: "ABC123",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: "UUID of the associated user.",
    example: "550e8400-e29b-41d4-a716-446655440000",
    type: String,
    format: "uuid",
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class CodeSmsUpdateDto extends PartialType(CodeSmsDto) {
  @ApiProperty({
    description: "UUID of the entity to be updated.",
    example: "550e8400-e29b-41d4-a716-446655440001",
    type: String,
    format: "uuid",
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CodeSmsGetDto extends PartialType(CodeSmsUpdateDto) {}
