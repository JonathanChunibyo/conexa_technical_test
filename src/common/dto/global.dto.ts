// libraries
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CredentialAuthDto {
  @ApiProperty({
    description: "Credential auth user ('password').",
    example: "c2VjdXJlUGFzczEyMw==",
    type: String,
  })
  @IsNotEmpty({ message: "Credential-Auth header is required" })
  @IsString({ message: "Credential-Auth must be a string" })
  "Credential-auth": string;
}

export class CredentialIdentifierDto {
  @ApiProperty({
    description: "Credential identifier user ('id').",
    example: "ODQ4YWE1ZWQtMjNhMC00NmNjLTg0YjEtYWQ2YWRmM2RlNDYw",
    type: String,
  })
  @IsNotEmpty({ message: "Credential-Auth header is required" })
  @IsString({ message: "Credential-Auth must be a string" })
  "Credential-Identifier": string;
}
