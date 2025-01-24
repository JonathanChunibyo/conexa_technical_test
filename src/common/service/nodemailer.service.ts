import { BadRequestException, Injectable } from '@nestjs/common';

//Libraries
import * as nodemailer from 'nodemailer';

// Constants - Messages
import * as messageError from '../constants/services/nodemailer.json';

// External Service
import { EnvironmentService } from './environment.service';

@Injectable()
export class NodemailerService {
    private transporter: nodemailer.Transporter;

    constructor(
        private readonly environmentService: EnvironmentService
    ) {
      this.transporter = nodemailer.createTransport({
        host: this.environmentService.get('HOST_MAIL'),
        port: Number(this.environmentService.get('PORT_MAIL')),
        secure: false,
        auth: {
          user: this.environmentService.get('USER_PROVIDER_MAIL'),
          pass: this.environmentService.get('PASSWORD_PROVIDER_MAIL'),
        }
      });
      this.transporter.verify((error, success) => {
        if (error) console.log(`transporter.verify ${error}`)
        if (success) console.log(messageError.successfulConnectionMailing)
      })
    }
    
    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        try {
          await this.transporter.sendMail({ from: this.environmentService.get('USER_PROVIDER_MAIL'), to, subject, text });
        } catch (error) {
          throw new BadRequestException(messageError.sendEmail);
        }
    }
}
