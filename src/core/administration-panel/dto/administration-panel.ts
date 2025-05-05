import { ApiProperty, PickType } from "@nestjs/swagger";
import { UserDto } from "../../../repositories/user/dto/user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto  extends PickType(UserDto, [ "name", "nickName", "email" ] as const) {}

export class MovieByIdDto {
     @ApiProperty({
        description: "Users full name.",
        example: "Juan Pérez",
        type: String,
      })
      @IsNotEmpty()
      @IsString()
      id: string;
}