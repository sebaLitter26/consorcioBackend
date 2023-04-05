/* import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfig } from '../../config/redis.config';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
	imports: [ConfigModule,
		ConfigModule,
		RedisModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					readyLog: true,
					config: {
						url: configService.get<RedisConfig>('redis').url,
					},
					onClientReady: (client) => {
						client.on('error', (err) => {
							logger.error(err);
						});
					},
				};
			},
		}),],
	providers: [
		{
			provide: PUB_SUB,
			return new RedisModule.forRootAsync({
				useFactory: () => ({
				  config: { 
					url: configService.get<RedisConfig>('redis').url,
				  },
				}),
			  }),
			useFactory: (configService: ConfigService) => {
				return RedisModule({
					config: {
						url: configService.get<RedisConfig>('redis').url,
					},
				});
			},
			inject: [ConfigService],
		},
	],
	exports: [PUB_SUB],
})
export class PubSubModule {}
 */
