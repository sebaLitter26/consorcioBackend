import { registerAs } from '@nestjs/config';

export default registerAs('twilio', () => ({
	accountSid: process.env.TWILIO_ACCOUNT_SID,
	authToken: process.env.TWILIO_AUTH_TOKEN,
}));
