import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  host: string;
  port: number;
  url: string;
  ttl: number;
}

export default registerAs(
  'redis',
  (): RedisConfig => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.REDIS_TTL, 10),
  }),
);
