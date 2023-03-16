import { PartialType } from '@nestjs/swagger';
import { CreateBuildingDto } from './create-building.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../roles/entities/role.entity';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { Status } from '../../../statuses/entities/status.entity';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../../files/entities/file.entity';
import { IsExist } from '../../../utils/validators/is-exists.validator';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
  @ApiProperty({ example: 'Ayacucho 876, Haedo' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['Building'], {
    message: 'addressAlreadyExists',
  })
  address: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;
}
