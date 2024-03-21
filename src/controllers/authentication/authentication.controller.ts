import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/models/users/users.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const { user } = loginDto;
    const passwordCompare = await this.authenticationService.comparePasswords(loginDto.password, user.password);
    console.log(passwordCompare)
    return "hellow"
  }
}
