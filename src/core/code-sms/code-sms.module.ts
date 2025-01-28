import { Module } from '@nestjs/common';
import { CodeSmsRepository } from './repositories/code-sms.repository';

@Module({
  providers: [
    CodeSmsRepository  
  ],
})
export class CodeSmsModule {}
