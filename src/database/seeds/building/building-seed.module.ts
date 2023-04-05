import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/modules/building/entities/building.entity';
import { BuildingSeedService } from './building-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingSeedService],
  exports: [BuildingSeedService],
})
export class BuildingSeedModule {}
