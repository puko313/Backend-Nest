import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendMail(fname: string, lname: string, to: string, subject: string, mail: string) {
    await this.mailerService.sendMail({
      to: to,
      from: "mail@algonrich.com",
      subject: subject,
      template: './received',
      text: mail,
      context: {
        firstname: fname,
        lastname: lname,
        mail:mail,
      },
    });
  }
}
