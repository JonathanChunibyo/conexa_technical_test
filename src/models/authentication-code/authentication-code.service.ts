// Libraries
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO
import { CreateAuthenticationCodeDto } from './dto/create-authentication-code.dto';
import { UpdateAuthenticationCodeDto } from './dto/update-authentication-code.dto';

// Entities
import { AuthenticationCode } from './entities/authentication-code.entity';

@Injectable()
export class AuthenticationCodeService {

  constructor(
    @InjectRepository(AuthenticationCode)
    private readonly authenticationCodeRepository: Repository<AuthenticationCode>,
  ) {}

  async create(createAuthenticationCodeDto: CreateAuthenticationCodeDto) {
    const authenticationCode = this.authenticationCodeRepository.create(createAuthenticationCodeDto);
    await this.authenticationCodeRepository.save(authenticationCode);
    return authenticationCode;
  }

  findAll() {
    return `This action returns all authenticationCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authenticationCode`;
  }

  update(id: number, updateAuthenticationCodeDto: UpdateAuthenticationCodeDto) {
    return `This action updates a #${id} authenticationCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} authenticationCode`;
  }
}
