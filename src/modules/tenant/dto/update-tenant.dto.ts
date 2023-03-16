import { PartialType } from '@nestjs/swagger';
import { CreateTenantDto } from './create-tenant.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../roles/entities/role.entity';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { Status } from '../../../statuses/entities/status.entity';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../../files/entities/file.entity';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Appartment } from '../../appartment/entities/appartment.entity';
import { User } from '../../../users/entities/user.entity';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @ApiProperty({ example: 'Sebastian' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @IsArray()
  @Validate(IsExist, ['Appartment','id'], {
    message: 'AppartmentNotExists',
  })
  appartments?: Appartment[] | null;

  @ApiProperty({ example: 'Sebastian', type: [User]  })
  @IsNotEmpty()
  @Validate(IsExist, ['User','id'], {
    message: 'UserNotExists',
  })
  user: User;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
