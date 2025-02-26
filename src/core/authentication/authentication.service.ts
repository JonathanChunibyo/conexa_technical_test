import { BadRequestException, Injectable } from '@nestjs/common';

// Constants - Messages
import * as codeError from './constants/error-message.json';
@Injectable()
export class AuthenticationService {
    getRandomCode(): string {
        try {
          let randomNumber = Math.floor(Math.random() * 1000000);
          let formattedNumber = randomNumber.toString().padStart(6, '0');
          return formattedNumber;
        } catch (error) {
          throw new BadRequestException(codeError.getRandomCode);
        }
      }
}
