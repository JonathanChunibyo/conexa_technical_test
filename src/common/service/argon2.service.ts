import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Libraries
import * as argon2 from 'argon2';

// Constants - Messages
import * as messageError from '../constants/services/argon2.json';

@Injectable()
export class ArgonService {
    private readonly logger = new Logger('AuthenticationService')

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        try {
          return await argon2.verify(hashedPassword, password);
        } catch (error) {
          this.logger.error(error);
          throw new InternalServerErrorException(messageError.comparePasswords);
        }
    }

    async hashPassword(password: string): Promise<string> {
        try {
          return await argon2.hash(password);
        } catch (error) {
          this.logger.error(error);
          throw new InternalServerErrorException(messageError.hashPassword);
        }
    }
}
