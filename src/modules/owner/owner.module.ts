import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CannotGetEntityManagerNotConnectedError } from 'typeorm';
import { template } from 'handlebars';
import { AbstractStrategy } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  controllers: [OwnerController],
  providers: [IsExist, IsNotExist, OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
