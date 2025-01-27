import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Libraries
import { JwtService } from '@nestjs/jwt';

// Constants - Messages
import * as messageError from '../constants/services/json-web-token.json';

interface JwtPayload {
    id: string;
}

@Injectable()
export class JsonWebTokenService {
    private readonly logger = new Logger('JsonWebTokenService')
    constructor(
        private readonly jwtService: JwtService
    ) {}


    getJwtToken(payload: JwtPayload) {
      try {
        const token = this.jwtService.sign(payload);
        return token;
      } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException(messageError.getJwtToken);
      }
    }

    verifyToken(token: string) {
      try {
        const payload = this.jwtService.verify(token);
        return payload;
      } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException(messageError.verifyToken);
      }
    }
}
