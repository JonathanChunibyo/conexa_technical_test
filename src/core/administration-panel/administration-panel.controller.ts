// Libraries
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  BadRequestException,
  Put,
  Get,
  Query,
} from "@nestjs/common";
// import { CommandBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";

// services
import { Base64Service } from "../../common/service/base64.service";
import { ArgonService } from "../../common/service/argon2.service";
import { StarwarsService } from "../../common/service/starwars.service";

// Repository
import { UserRepository } from "../../repositories/user/repositories/user.repository";

// DTO
import { CreateUserDto, MovieByIdDto } from "./dto/administration-panel";
import { CredentialAuthDto } from "../../common/dto/global.dto";
import { UserUpdateDto } from "../../repositories/user/dto/user.dto";

// swagger
import { readApiValidateField } from "../../infrastructure/documentation/command/swagger.command";
import { ApiSwaggerResponse } from "../../infrastructure/documentation/decorators/swagger-decorator";

// constant
import * as CONSTANTS_GLOBAL_ERROR from "../../common/constants/global/error.json";
import * as CONSTANTS_GLOBAL_HEADERS from "../../common/constants/global/headers.json";

const controllerPath = "administration-panel";

@Controller(controllerPath)
export class AdministrationPanelController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly argonService: ArgonService,
    private readonly base64Service: Base64Service,
    private readonly starwarsService: StarwarsService
  ) {}

  @Post("create-user")
  @ApiSwaggerResponse(readApiValidateField("create-user", controllerPath))
  @UseGuards(AuthGuard("jwt"))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() credentialAuthDto: CredentialAuthDto
  ) {
    if (!credentialAuthDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth])
      throw new BadRequestException(CONSTANTS_GLOBAL_ERROR.credentialAuth);
    const password = this.base64Service.decodeBase64(
      credentialAuthDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth]
    );
    const passwordEncrypt = await this.argonService.hashPassword(password);
    await this.userRepository.create({
      ...createUserDto,
      password: passwordEncrypt,
    });
    return true;
  }

  @Put("update-user")
  @ApiSwaggerResponse(readApiValidateField("update-user", controllerPath))
  @UseGuards(AuthGuard("jwt"))
  async updateUser(
    @Body() updateUserDto: UserUpdateDto,
    @Headers() credentialAuthDto: CredentialAuthDto
  ) {
    const { id, ...user } = updateUserDto;
    if (credentialAuthDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth]) {
      const password = this.base64Service.decodeBase64(
        credentialAuthDto[CONSTANTS_GLOBAL_HEADERS.credentialAuth]
      );
      user.password = await this.argonService.hashPassword(password);
    }

    await this.userRepository.updateById({ id }, user);
    return true;
  }

  @Get("movie-by-id")
  @ApiSwaggerResponse(readApiValidateField("list-movies", controllerPath))
  @UseGuards(AuthGuard("jwt"))
  async listMovies(@Query() movieByIdDto: MovieByIdDto) {
    const id = movieByIdDto.id;
    const result = await this.starwarsService.getFilmsById(id);
    return result;
  }
}
