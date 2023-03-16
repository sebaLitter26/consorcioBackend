import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateAppartmentDto } from './dto/create-appartment.dto';
import { UpdateAppartmentDto } from './dto/update-appartment.dto';
import { Appartment } from './entities/appartment.entity';

@Injectable()
export class AppartmentService {
  constructor(
    @InjectRepository(Appartment)
    private appartmentRepository: Repository<Appartment>,
  ) {}

  create(createProfileDto: CreateAppartmentDto) {
    return this.appartmentRepository.save(
      this.appartmentRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.appartmentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Appartment>) {
    return this.appartmentRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateAppartmentDto: UpdateAppartmentDto) {
    return this.appartmentRepository.save(
      this.appartmentRepository.create({
        id,
        ...updateAppartmentDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.appartmentRepository.softDelete(id);
  }
}
