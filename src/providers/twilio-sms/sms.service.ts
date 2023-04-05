import { Injectable, Scope } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable({ scope: Scope.TRANSIENT })
export class SmsService {
  public constructor(private readonly twilioService: TwilioService) {}

  async sendSMS(from: string, to: string, body: string) {
    return this.twilioService.client.messages.create(
      {
        body,
        from,
        to,
      },
      function (err, data) {
        if (err) {
          console.log('err', err);
          console.log('data', data);
        }
      },
    );
  }
}
