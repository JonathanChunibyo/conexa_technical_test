import { Injectable, NestMiddleware, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/models/users/users.service';

import * as message from '../../../errors/messageGlobal.errors.json'

@Injectable()
export class UserExistMiddleware implements NestMiddleware {

    private readonly logger = new Logger('UsersService')

    constructor(private readonly usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const extractDataFromRequest = { ...req.body, ...req.params, ...req.query }
            const {
                nickName = '',
                email = '',
                id = ''
            } = extractDataFromRequest;
            const queryUser = this.usersService.find();
            const user = await queryUser.select(['user.id', 'user.name', 'user.lastName', 'user.nickName', 'user.password', 'user.email'])
                .where('user.nickname = :nickName', { nickName })
                .orWhere('user.email = :email', { email })
                .orWhere('user.id = :id', { id })
                .getOne();

            if (!user) {
                const errorException = new UnauthorizedException(message.userDoesNotExist);
                return res.status(404).json(errorException.getResponse());
            }
            
            req.body.user = user;
            next();

        } catch (error) {
            this.logger.error(error);
            const errorException = new BadRequestException(message.somethingWrong);
            return res.status(500).json(errorException.getResponse());
        }
    }
}
