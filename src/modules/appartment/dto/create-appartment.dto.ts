import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from '../../../statuses/entities/status.entity';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../../files/entities/file.entity';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Building } from '../../building/entities/building.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';

export class CreateAppartmentDto {
  @ApiProperty({ example: 'Sebastian', type: [Building] })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsExist, ['Building','id'], {
    message: 'BuildingNotExists',
  })
  building?: Building | null;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @Max(20)
  @Min(3)
  floor: number;

  @ApiProperty({ example: 'A' })
  @IsNotEmpty()
  @MaxLength(1)
  division: string;

  @ApiProperty({ example: 'Sebastian', type: [Tenant] })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsExist, ['Tenant','id'], {
    message: 'TenantNotExists',
  })
  tenant?: Tenant | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;


  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

}


/* 

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  
  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null; */