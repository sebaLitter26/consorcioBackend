import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from './dto/create-Owner.dto';
import { UpdateOwnerDto } from './dto/update-Owner.dto';
import { Owner } from './entities/Owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  create(createProfileDto: CreateOwnerDto) {
    return this.ownerRepository.save(
      this.ownerRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.ownerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Owner>) {
    return this.ownerRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return this.ownerRepository.save(
      this.ownerRepository.create({
        id,
        ...updateOwnerDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.ownerRepository.softDelete(id);
  }
}
