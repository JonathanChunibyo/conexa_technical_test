import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiValidateFile } from 'src/infrastructure/documentation/decorators/swagger-decorator';
import { UserRepository } from '../user/repositories/user.repository';
import { UserDto } from '../user/dto/user.dto';

@Controller('administration-panel')
export class AdministrationPanelController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  @Post("create-user")
  @ApiValidateFile({
    summary: 'Create a new user',
    description: 'This endpoint allows the creation of a new user in the system. Required data must be provided in the request body.',
    tags: ['Users'],
    deprecated: false
  })
  async createUser(@Body() createUserDto: UserDto) {
    const user = this.userRepository.create(createUserDto);
    console.log(user);
    return user;
    // return await this.commandBus.execute(new CreateUserCommand(
    //   createUserDto.name,
    //   createUserDto.nickName,
    //   createUserDto.email,
    //   createUserDto.password,
    // ));
  }
}
