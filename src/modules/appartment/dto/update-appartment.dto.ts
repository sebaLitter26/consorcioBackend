import { PartialType } from '@nestjs/swagger';
import { CreateAppartmentDto } from './create-appartment.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { StatusEntity } from '../../../status/entities/status.entity';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../../files/entities/file.entity';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Building } from '../../building/entities/building.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';

export class UpdateAppartmentDto extends PartialType(CreateAppartmentDto) {
  @ApiProperty({ example: 'Sebastian', type: () => Building })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsExist, ['Building', 'id'], {
    message: 'BuildingNotExists',
  })
  building?: Building | null;

  @ApiProperty({ example: '1' })
  @IsOptional()
  @Max(20)
  @Min(3)
  floor: number;

  @ApiProperty({ example: 'A' })
  @IsOptional()
  @MaxLength(1)
  division: string;

  @ApiProperty({ example: 'Sebastian', type: [Tenant] })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsExist, ['Tenant', 'id'], {
    message: 'TenantNotExists',
  })
  tenant?: Tenant | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: StatusEntity })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: StatusEntity;
}
