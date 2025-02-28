import { PickType } from "@nestjs/swagger";
import { UserDto } from "src/repositories/user/dto/user.dto";

export class CreateUserDto  extends PickType(UserDto, [ "name", "nickName", "email" ] as const) {}
