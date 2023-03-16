import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  create(createProfileDto: CreateTenantDto) {
    return this.tenantRepository.save(
      this.tenantRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.tenantRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Tenant>) {
    return this.tenantRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return this.tenantRepository.save(
      this.tenantRepository.create({
        id,
        ...updateTenantDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.tenantRepository.softDelete(id);
  }
}
