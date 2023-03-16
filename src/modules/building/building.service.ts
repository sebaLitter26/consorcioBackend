import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  create(createProfileDto: CreateBuildingDto) {
    return this.buildingRepository.save(
      this.buildingRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.buildingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Building>) {
    return this.buildingRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return this.buildingRepository.save(
      this.buildingRepository.create({
        id,
        ...updateBuildingDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.buildingRepository.softDelete(id);
  }
}
