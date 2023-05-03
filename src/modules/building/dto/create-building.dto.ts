import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
  isArray,
} from 'class-validator';
import { StatusEntity } from '../../../status/entities/status.entity';
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

    @IsArray()
    @Type(()=> FileEntity)
    @ApiProperty({ 
        //type: () => FileEntity,
        nullable: true,
        isArray: true,
        description: 'Images del edificio'
    })
    @IsOptional()
    @Validate(IsExist, ['FileEntity', 'id'], {
        message: 'imageNotExists',
    })
    photo?: FileEntity[] | null;

    @ApiProperty({ 
        type: () => StatusEntity,
        nullable: true, 
        description: 'Estado del edificio'
    })
    @Validate(IsExist, ['status', 'id'], {
        message: 'statusNotExists',
    })
    status?: StatusEntity | null;
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
