//3.15  5.08   9-19

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

export class CreateOwnerDto {
  @ApiProperty({ example: 'Sebastian', type: [Appartment] })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
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
