// libraries
import { Module } from "@nestjs/common";

// controller
import { AuthenticationController } from "./authentication.controller";

// services
import { AuthenticationService } from "./authentication.service";
import { Base64Service } from "../../common/service/base64.service";
import { ArgonService } from "../../common/service/argon2.service";
import { JsonWebTokenService } from "../../common/service/json-web-token.service";
import { NodemailerService } from "../../common/service/nodemailer.service";

// repositories
import { UserRepository } from "../../repositories/user/repositories/user.repository";
import { CodeSmsRepository } from "../../repositories/code-sms/repositories/code-sms.repository";

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserRepository,
    CodeSmsRepository,
    Base64Service,
    ArgonService,
    JsonWebTokenService,
    NodemailerService,
  ],
})
export class AuthenticationModule {}
