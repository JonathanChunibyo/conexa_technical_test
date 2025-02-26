// libraries
import { PickType } from "@nestjs/swagger";

// dto
import { CodeSmsDto } from "src/core/entities/code-sms/dto/code-sms.dto";
import { UserDto } from "src/core/entities/user/dto/user.dto";

export class ValidateEmailDto extends PickType(UserDto, ['email'] as const) {}

export class VerificationCodeDto extends PickType(CodeSmsDto, ['code'] as const){}

export class LoginDto  extends PickType(UserDto, ['email', 'password'] as const) {}