import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  getRandomAuthenticationCode(): string {
    let randomNumber = Math.floor(Math.random() * 1000000);
    let formattedNumber = randomNumber.toString().padStart(6, '0');
    return formattedNumber;
  }
}
