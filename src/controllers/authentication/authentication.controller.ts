// Libraries
import { Controller, Get, Post, Body, UnauthorizedException, Query } from '@nestjs/common';

// Service
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/models/users/users.service';
import { AuthenticationCodeService } from 'src/models/authentication-code/authentication-code.service';

// DTO
import { LoginDTO } from './dto/login.dto';
import { UserCredentialValidationDTO } from './dto/userCredentialValidation.dto';

// Constants message
import * as message from '../../errors/messageGlobal.errors.json'

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly authenticationCodeService: AuthenticationCodeService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const { user } = loginDto;
    const passwordCompare = await this.authenticationService.comparePasswords(loginDto.password, user.password);
    if (passwordCompare) {
      const token = this.authenticationService.getJwtToken({ id: user.id });
      const { password, ...userData } = user;
      return {
        userData,
        token
      };
    }
    throw new UnauthorizedException(message.userDoesNotExist);
  }

  @Get('userCredentialValidation')
  async userCredentialValidation(@Body() userCredentialValidationDTO: UserCredentialValidationDTO) {
    const { user } = userCredentialValidationDTO;
    const code = this.authenticationService.getRandomAuthenticationCode();
    await this.authenticationCodeService.create({ userId: user, code });
    this.authenticationService.sendEmail(user.email, '',code);
    return user.id;
  }
}
