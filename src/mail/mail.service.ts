import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18n, I18nService } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';
import { LoggerService } from 'src/providers/logger/logger.service';

@Injectable()
export class MailService {
  constructor(
    @I18n()
    private readonly i18n: I18nService,
    private mailerService: MailerService,
    private configService: ConfigService,
    public logger: LoggerService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>) {
    //this.logger.log('confirmEmailDto ' ,mailData); 
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: await this.i18n.t('common.confirmEmail'),
      text: `${this.configService.get('app.frontendDomain')}/${this.configService.get('app.apiPrefix')}/v1/auth/email/confirm/${
        mailData.data.hash
      } ${await this.i18n.t('common.confirmEmail')}`,
      template: 'activation',
      context: {
        title: await this.i18n.t('common.confirmEmail'),
        url: `${this.configService.get('app.frontendDomain')}/${this.configService.get('app.apiPrefix')}/v1/auth/email/confirm/${
          mailData.data.hash
        }`,
        actionTitle: await this.i18n.t('common.confirmEmail'),
        app_name: this.configService.get('app.name'),
        text1: await this.i18n.t('confirm-email.text1'),
        text2: await this.i18n.t('confirm-email.text2'),
        text3: await this.i18n.t('confirm-email.text3'),
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: await this.i18n.t('common.resetPassword'),
      text: `${this.configService.get('app.frontendDomain')}/password-change/${
        mailData.data.hash
      } ${await this.i18n.t('common.resetPassword')}`,
      template: 'reset-password',
      context: {
        title: await this.i18n.t('common.resetPassword'),
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.hash
        }`,
        actionTitle: await this.i18n.t('common.resetPassword'),
        app_name: this.configService.get('app.name'),
        text1: await this.i18n.t('reset-password.text1'),
        text2: await this.i18n.t('reset-password.text2'),
        text3: await this.i18n.t('reset-password.text3'),
        text4: await this.i18n.t('reset-password.text4'),
      },
    });
  }

  async sendMail(mailData: MailData<{ subject: string; text: string; }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: `${mailData.data.subject}`,
      text: `${mailData.data.text}`,
      /* template: 'reset-password',
      context: {
        title: await this.i18n.t('common.resetPassword'),
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.hash
        }`,
        actionTitle: await this.i18n.t('common.resetPassword'),
        app_name: this.configService.get('app.name'),
        text1: await this.i18n.t('reset-password.text1'),
        text2: await this.i18n.t('reset-password.text2'),
        text3: await this.i18n.t('reset-password.text3'),
        text4: await this.i18n.t('reset-password.text4'),
      }, */
    });
  }
}
