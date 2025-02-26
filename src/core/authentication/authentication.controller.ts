// libraries
import { Controller, Post, Body, Headers, BadRequestException } from "@nestjs/common";

// services
import { AuthenticationService } from "./authentication.service";
import { Base64Service } from "src/common/service/base64.service";
import { ArgonService } from "src/common/service/argon2.service";
import { JsonWebTokenService } from "src/common/service/json-web-token.service";
import { NodemailerService } from "src/common/service/nodemailer.service";

// decorator
import { ApiSwaggerResponse } from "src/infrastructure/documentation/decorators/swagger-decorator";

// documentation
import { readApiValidateField } from "src/infrastructure/documentation/command/swagger.command";

// repositories
import { UserRepository } from "../entities/user/repositories/user.repository";
import { CodeSmsRepository } from "../entities/code-sms/repositories/code-sms.repository";

// dto
import { ValidateEmailDto, VerificationCodeDto } from "./dto/authentication.dto";
import { CredentialAuthDto, CredentialIdentifierDto } from "src/common/dto/global.dto";

// constant
import * as CONSTANTS_NODEMAILER from "../../common/constants/services/nodemailer.json";
import * as CONSTANTS_GLOBAL_ERROR from "../../common/constants/global/error.json";

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
    if(!credentialIdentifierDto['credential-identifier']) throw new BadRequestException(CONSTANTS_GLOBAL_ERROR.credentialIdentifier);
    const id = this.base64Service.decodeBase64(credentialIdentifierDto['credential-identifier']);
    const user = await this.userRepository.findById({ id });
    if(user) {
      const { code } = verificationCodeDto;
      const codeVerification = await this.codeSmsRepository.find()
        .where({ code, userId: user.id })
        .getOne();
      if(codeVerification) {
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
    if(!credentialAuthDto["credential-auth"]) throw new BadRequestException(CONSTANTS_GLOBAL_ERROR.credentialAuth);
    if (user) {
      const password = this.base64Service.decodeBase64(credentialAuthDto["credential-auth"]);
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
}
