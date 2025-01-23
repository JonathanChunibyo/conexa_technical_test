import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/database/user/user.dto';
import { UserRepository } from '../database/user/user.repository';
import { CommandBus } from '@nestjs/cqrs';
import { ApiValidateFile } from 'src/documentation/decorators/swagger-decorator';

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
