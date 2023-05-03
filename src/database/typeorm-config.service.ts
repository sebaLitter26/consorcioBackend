import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type'),
      url: this.configService.get('database.url'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.name'),
      synchronize: this.configService.get('database.synchronize'), // cuando tenes una nueva columna en la entidad , la crea en la base.
      autoLoadEntities: true, //  sacar luego
      dropSchema: true,
      migrationsRun: true,
      keepConnectionAlive: true,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      //entities: ['dist/**/entities/*.entity.js','dist/modules/**/entities/*.entity.js'],
      //migrations: ['src/database/migrations/*{.ts,.js}'],
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      //migrations: ['dist/database/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: __dirname + '/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        //max: this.configService.get('database.maxConnections'),
        ssl: this.configService.get('database.sslEnabled')
          ? {
              rejectUnauthorized: this.configService.get(
                'database.rejectUnauthorized',
              ),
              ca: this.configService.get('database.ca') ?? undefined,
              key: this.configService.get('database.key') ?? undefined,
              cert: this.configService.get('database.cert') ?? undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
