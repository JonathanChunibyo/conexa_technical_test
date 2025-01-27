// Libraries
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

// Repository
import { UserRepository } from '../user/repositories/user.repository';

// DTO
import { UserDto } from '../user/dto/user.dto';

// swagger
import { readApiValidateField } from '../../infrastructure/documentation/command/swagger.command';
import { ApiSwaggerResponse } from 'src/infrastructure/documentation/decorators/swagger-decorator';

const controllerPath = 'administration-panel';

@Controller(controllerPath)
export class AdministrationPanelController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  @Post("create-user")
  @ApiSwaggerResponse(readApiValidateField("create-user", controllerPath))
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: UserDto) {
    const user = this.userRepository.create(createUserDto);
    return user;
    // return await this.commandBus.execute(new CreateUserCommand(
    //   createUserDto.name,
    //   createUserDto.nickName,
    //   createUserDto.email,
    //   createUserDto.password,
    // ));
  }
}
