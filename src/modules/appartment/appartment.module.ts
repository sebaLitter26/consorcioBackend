import { Module } from '@nestjs/common';
import { AppartmentService } from './appartment.service';
import { AppartmentController } from './appartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appartment } from './entities/appartment.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Appartment])],
  controllers: [AppartmentController],
  providers: [IsExist, IsNotExist, AppartmentService],
  exports: [AppartmentService],
})
export class AppartmentModule {}
