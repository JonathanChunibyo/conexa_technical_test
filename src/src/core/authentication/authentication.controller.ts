// libraries
import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";

// services
import { AuthenticationService } from "./authentication.service";
import { Base64Service } from "../../common/service/base64.service";
import { ArgonService } from "../../common/service/argon2.service";
import { JsonWebTokenService } from "../../common/service/json-web-token.service";
import { NodemailerService } from "../../common/service/nodemailer.service";

// decorator
import { ApiSwaggerResponse } from "../../infrastructure/documentation/decorators/swagger-decorator";

// guards
import { AuthGuard } from "@nestjs/passport";

// documentation
import { readApiValidateField } from "../../infrastructure/documentation/command/swagger.command";

// repositories
import { UserRepository } from "../../repositories/user/repositories/user.repository";
import { CodeSmsRepository } from "../../repositories/code-sms/repositories/code-sms.repository";

// dto
import {
  ChangePasswordCredentialDto,
  ValidateEmailDto,
  VerificationCodeDto,
} from "./dto/authentication.dto";
import {
  CredentialAuthDto,
  CredentialIdentifierDto,
} from "../../common/dto/global.dto";

// constant
import * as CONSTANTS_NODEMAILER from "../../common/constants/services/nodemailer.json";
import * as CONSTANTS_GLOBAL_ERROR from "../../common/constants/global/error.json";
import * as CONSTANTS_GLOBAL_HEADERS from "../../common/constants/global/headers.json";
import * as CONSTANTS_HEADERS from "./constants/headers.json";

const controllerPath = "authentication";
@Controller(controllerPath)
export class AuthenticationController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly codeSmsRepository: CodeSmsRepository,
    private readonly authenticationService: AuthenticationService,
    private readonly base64Service: Base64Service,
    private readonly argonService: ArgonService,
    private readonly jsonWebTokenService: JsonWebTokenService,
    private readonly nodemailerService: NodemailerService
  ) {}

  @Post("validate-email")
  @ApiSwaggerResponse(readApiValidateField("validate-email", controllerPath))
  async validateEmail(@Body() validateEmailDto: ValidateEmailDto) {
    const { email } = validateEmailDto;
    const user = await this.userRepository.find().where({ email }).getOne();
    if (user) {
      const code = this.authenticationService.getRandomCode();
      await this.codeSmsRepository.create({ userId: user?.id, code });
      const credential = this.base64Service.encodeBase64(user.id);
      setImmediate(() => {
        const { template, subject } = this.nodemailerService.getHtmlTemplate(
          CONSTANTS_NODEMAILER.templateSendCode,
          { code }
        );
        this.nodemailerService.sendEmail(user.email, subject, template);
      });
      return { userExist: true, credential };
    }
    return false;
  }

  @Post("verification-code")
  @ApiSwaggerResponse(readApiValidateField("verification-code", controllerPath))
  async verificationCode(
    @Body() verificationCodeDto: VerificationCodeDto,
    @Headers() credentialIdentifierDto: CredentialIdentifierDto
  ) {
    if (!credentialIdentifierDto[CONSTANTS_GLOBAL_HEADERS.credentialIdentifier])
      throw new BadRequestException(
        CONSTANTS_GLOBAL_ERROR.credentialIdentifier
      );
    const id = this.base64Service.decodeBase64(
      credentialIdentifierDto[CONSTANTS_GLOBAL_HEADERS.credentialIdentifier]
    );
    const user = await this.userRepository.findById({ id });
    if (user) {
      const { code } = verificationCodeDto;
      const codeVerification = await this.codeSmsRepository
        .find()
        .where({ code, userId: user.id })
        .getOne();
      if (codeVerification) {
        await this.codeSmsRepository.delete({ userId: user.id });
        const userValidate = this.userRepository.deleteSensitiveData(user);
        const token = this.jsonWebTokenService.getJwtToken({ id: user.id });
        return { user: userValidate, token };
      }
    }
    return false;
  }

  @Post("login")
  @ApiSwaggerResponse(readApiValidateField("login", controllerPath))
  async login(
    @Body() validateEmailDto: ValidateEmailDto,
    @Headers() credentialAuthDto: CredentialAuthDto
  ) {
    const { email } = validateEmailDto;
    const user = await this.userRepository.find().where({ email }).getOne();
    if (!credentialAuthDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth])
      throw new BadRequestException(CONSTANTS_GLOBAL_ERROR.credentialAuth);
    if (user) {
      const password = this.base64Service.decodeBase64(
        credentialAuthDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth]
      );
      const isValidPassword = await this.argonService.comparePasswords(
        password,
        user.password
      );
      if (isValidPassword) {
        const userValidate = this.userRepository.deleteSensitiveData(user);
        const token = this.jsonWebTokenService.getJwtToken({ id: user.id });
        return { user: userValidate, token };
      }
    }
    return false;
  }

  @Post("change-password")
  @ApiSwaggerResponse(readApiValidateField("change-password", controllerPath))
  @UseGuards(AuthGuard("jwt"))
  async changePassword(
    @Headers() credentialDto: ChangePasswordCredentialDto,
    @Headers() credentialIdentifierDto: CredentialIdentifierDto
  ) {
    if (
      !credentialDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth] ||
      !credentialDto[CONSTANTS_HEADERS.credentialBeforeAuth]
    )
      throw new BadRequestException(CONSTANTS_GLOBAL_ERROR.credentialAuth);
    if (!credentialIdentifierDto[CONSTANTS_GLOBAL_HEADERS.credentialIdentifier])
      throw new BadRequestException(
        CONSTANTS_GLOBAL_ERROR.credentialIdentifier
      );
    const passwordBefore = this.base64Service.decodeBase64(
      credentialDto[CONSTANTS_HEADERS.credentialBeforeAuth]
    );
    const password = this.base64Service.decodeBase64(
      credentialDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth]
    );
    const id = this.base64Service.decodeBase64(
      credentialIdentifierDto[CONSTANTS_GLOBAL_HEADERS.credentialIdentifier]
    );
    const user = await this.userRepository.findById({ id });
    if (user) {
      const isValidPassword = await this.argonService.comparePasswords(
        passwordBefore,
        user.password
      );
      if (isValidPassword) {
        const passwordEncrypt = await this.argonService.hashPassword(password);
        await this.userRepository.updateById(
          { id: user.id },
          { password: passwordEncrypt }
        );
        return true;
      }
    }
    return false;
  }
}
