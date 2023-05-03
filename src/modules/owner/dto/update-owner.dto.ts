import { PartialType } from '@nestjs/swagger';
import { CreateOwnerDto } from './create-owner.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { StatusEntity } from '../../../status/entities/status.entity';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../../files/entities/file.entity';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Appartment } from '../../appartment/entities/appartment.entity';
import { User } from '../../../users/entities/user.entity';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @ApiProperty({ example: 'Sebastian' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsExist, ['Appartment', 'id'], {
    message: 'AppartmentNotExists',
  })
  appartment: Appartment;

  @ApiProperty({ example: 'Sebastian', type: [User] })
  @IsNotEmpty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'UserNotExists',
  })
  user: User;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: StatusEntity })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: StatusEntity;
}
