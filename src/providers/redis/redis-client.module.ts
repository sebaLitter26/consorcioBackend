import {
  Global,
  Module,
  CacheModule,
  DynamicModule,
  CacheModuleAsyncOptions,
  CacheModuleOptions,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfig } from '../../config/redis.config';
import { RedisService } from './redis.service';
//import * as redisStore from 'cache-manager-redis-store';

//import { ConfigCacheError } from './cache.error';

//@Global()
@Module({})
export class RedisCacheModule {
  public static geRedisConnectionOptions(
    config: ConfigService,
  ): CacheModuleOptions {
    const redis = config.get<RedisConfig>('redis');

    /* if (!redis) {
		  throw new ConfigCacheError('redis config is missing');
		} */
    return {
      //store: redisStore,
      host: redis.host,
      port: redis.port,
      ttl: redis.ttl,
    };
  }
  public static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      imports: [
        CacheModule.registerAsync({
          isGlobal: true,
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) =>
            await RedisCacheModule.geRedisConnectionOptions(configService),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
