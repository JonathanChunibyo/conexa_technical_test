import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { UserRepository } from "../entities/user/repositories/user.repository";
import { CodeSmsRepository } from "../entities/code-sms/repositories/code-sms.repository";
import { Base64Service } from "src/common/service/base64.service";
import { ArgonService } from "src/common/service/argon2.service";
import { JsonWebTokenService } from "src/common/service/json-web-token.service";
import { NodemailerService } from "src/common/service/nodemailer.service";

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService, 
    UserRepository,
    CodeSmsRepository,
    Base64Service,
    ArgonService,
    JsonWebTokenService,
    NodemailerService
  ]
})
export class AuthenticationModule {}
