import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/models/users/users.service';

import * as message from '../../errors/messageGlobal.errors.json'

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const { user } = loginDto;
    const passwordCompare = await this.authenticationService.comparePasswords(loginDto.password, user.password);
    if(passwordCompare) {
      const token = this.authenticationService.getJwtToken({ id: user.id });
      const { password, ...userData } = user;
      return {
        userData,
        token
      };
    }
    throw new UnauthorizedException(message.userDoesNotExist);
  }
}
