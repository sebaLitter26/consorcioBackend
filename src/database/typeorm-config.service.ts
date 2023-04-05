import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FileEntity } from 'src/files/entities/file.entity';
import { Appartment } from 'src/modules/appartment/entities/appartment.entity';
import { Building } from 'src/modules/building/entities/building.entity';
import { Owner } from 'src/modules/owner/entities/Owner.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { StatusEntity } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';

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
      synchronize: this.configService.get('database.synchronize'),
      autoLoadEntities: true, //  sacar luego
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      //entities: [__dirname + '/../**/**/*.entity{.ts,.js}',__dirname + '/../**/**/**/*.entity{.ts,.js}'],
      entities: [
        RoleEntity,
        User,
        StatusEntity,
        FileEntity,
        Appartment,
        Building,
        Owner,
        Tenant,
      ],
      //C:\Users\172303\Documents\consorcio\back-consorcio\dist\database
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
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
