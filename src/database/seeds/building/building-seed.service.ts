import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/modules/building/entities/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingSeedService {
  constructor(
    @InjectRepository(Building)
    private repository: Repository<Building>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count();

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          address: 'Ayacucho 876, Haedo',
          photo: null, //{"id": "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae"},
          /* status: {
            id: StatusEnum.active,
            name: 'Active',
          }, */
        }),
      );
    }
  }
}
