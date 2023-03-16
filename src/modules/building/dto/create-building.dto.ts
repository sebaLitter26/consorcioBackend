import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from '../../../statuses/entities/status.entity';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../../files/entities/file.entity';
import { IsExist } from '../../../utils/validators/is-exists.validator';

export class CreateBuildingDto {
  @ApiProperty({ example: 'Ayacucho 876, Haedo' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
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