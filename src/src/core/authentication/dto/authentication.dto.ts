// libraries
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

// dto
import { CodeSmsDto } from "../../../repositories/code-sms/dto/code-sms.dto";
import { UserDto } from "../../../repositories/user/dto/user.dto";
import { CredentialAuthDto } from "../../../common/dto/global.dto";

export class ValidateEmailDto extends PickType(UserDto, ["email"] as const) {}

export class VerificationCodeDto extends PickType(CodeSmsDto, [
  "code",
] as const) {}

export class ChangePasswordCredentialDto extends CredentialAuthDto {
  @ApiProperty({
    description: "Credential auth user ('password').",
    example: "c2VjdXJlUGFzczEyMw==",
    type: String,
  })
  @IsNotEmpty({ message: "credential-before-auth header is required" })
  @IsString({ message: "credential-before-auth must be a string" })
  "credential-before-auth": string;
}
