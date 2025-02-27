// Libraries
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";

// services
import { ArgonService } from "src/common/service/argon2.service";

// Repository
import { UserRepository } from "../../repositories/user/repositories/user.repository";

// DTO
import { UserDto } from "../../repositories/user/dto/user.dto";

// swagger
import { readApiValidateField } from "../../infrastructure/documentation/command/swagger.command";
import { ApiSwaggerResponse } from "src/infrastructure/documentation/decorators/swagger-decorator";

const controllerPath = "administration-panel";

@Controller(controllerPath)
export class AdministrationPanelController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
    private readonly argonService: ArgonService,
  ) {}

  @Post("create-user")
  @ApiSwaggerResponse(readApiValidateField("create-user", controllerPath))
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: UserDto) {
    const { password, ...user } = createUserDto;
    const passwordEncrypt = await this.argonService.hashPassword(password);
    await this.userRepository.create({ ...user, password: passwordEncrypt });
    return true;
    //TODO: CQRS
    // return await this.commandBus.execute(new CreateUserCommand(
    //   createUserDto.name,
    //   createUserDto.nickName,
    //   createUserDto.email,
    //   createUserDto.password,
    // ));
  }
}
