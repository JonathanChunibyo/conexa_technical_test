import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrationPanelService } from './administration-panel.service';
import { UserDto } from 'src/database/user/user.dto';
import { UserRepository } from '../database/user/user.repository';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/database/user/commands/create-user.command/create-user.command';

@Controller('administration-panel')
export class AdministrationPanelController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  @Post("create-user")
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
