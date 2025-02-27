// libraries
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CredentialAuthDto {
  @ApiProperty({
    description: "Credential auth user ('password').",
    example: "c2VjdXJlUGFzczEyMw==",
    type: String,
  })
  @IsNotEmpty({ message: "credential-auth header is required" })
  @IsString({ message: "credential-auth must be a string" })
  "credential-auth": string;
}

export class CredentialIdentifierDto {
  @ApiProperty({
    description: "Credential identifier user ('id').",
    example: "ODQ4YWE1ZWQtMjNhMC00NmNjLTg0YjEtYWQ2YWRmM2RlNDYw",
    type: String,
  })
  @IsNotEmpty({ message: "credential-identifier header is required" })
  @IsString({ message: "credential-identifier must be a string" })
  "credential-identifier": string;
}
