// Libraries
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

// Interfaces
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthenticationService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger('UsersService')

  constructor(
    private readonly jwtService: JwtService
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_PROVIDER_MAIL,
        pass: process.env.PASSWORD_PROVIDER_MAIL
      }
    });
  }

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

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({ from: process.env.USER_PROVIDER_MAIL, to, subject, text });
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
}
