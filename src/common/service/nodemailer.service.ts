import { BadRequestException, Injectable } from "@nestjs/common";

//Libraries
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";

// Constants - Messages
import * as CONSTANTS from "../constants/services/nodemailer.json";

// External Service
import { EnvironmentService } from "./environment.service";

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly environmentService: EnvironmentService) {
    this.transporter = nodemailer.createTransport({
      host: this.environmentService.get("HOST_MAIL"),
      port: Number(this.environmentService.get("PORT_MAIL")),
      secure: false,
      auth: {
        user: this.environmentService.get("USER_PROVIDER_MAIL"),
        pass: this.environmentService.get("PASSWORD_PROVIDER_MAIL"),
      },
    });
    this.transporter.verify((error, success) => {
      if (error) console.log(`transporter.verify ${error}`);
      if (success) console.log(CONSTANTS.successfulConnectionMailing);
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({ from: this.environmentService.get("USER_PROVIDER_MAIL"), to, subject, html });
    } catch (error) {
      throw new BadRequestException(CONSTANTS.sendEmail);
    }
  }

  getHtmlTemplate(
    templateType: string,
    params: Record<string, string | number>
  ): { template: string; subject: string } {
    let filePath: string, subject: string;
    switch (templateType) {
      case CONSTANTS.templateSendCode:
        filePath = path.resolve('src', 'public', `${templateType}.html`);
        subject = CONSTANTS.subjectSendCode;
        break;
      default:
        throw new BadRequestException("Invalid email template type");
    }

    let template = fs.readFileSync(filePath, "utf8");

    Object.keys(params).forEach((key) => {
      const value = String(params[key]);
      template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
    });
    return { template, subject };
  }
}
