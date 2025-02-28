// libraries
import { Module } from '@nestjs/common';

// repositories
import { CodeSmsRepository } from './repositories/code-sms.repository';

@Module({
  providers: [
    CodeSmsRepository  
  ],
})
export class CodeSmsModule {}
