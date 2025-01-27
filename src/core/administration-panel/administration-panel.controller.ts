import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserRepository } from '../user/repositories/user.repository';
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
