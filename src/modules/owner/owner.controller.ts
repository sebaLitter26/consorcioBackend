import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-Owner.dto';
import { UpdateOwnerDto } from './dto/update-Owner.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';

/* @ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard) */
@ApiTags('Owners')
@Controller({
  path: 'Owner',
  version: '1',
})
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateOwnerDto) {
    return this.ownerService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.ownerService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateOwnerDto) {
    return this.ownerService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ownerService.softDelete(id);
  }
}
