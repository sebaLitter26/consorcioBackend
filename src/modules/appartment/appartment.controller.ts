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
import { AppartmentService } from './appartment.service';
import { CreateAppartmentDto } from './dto/create-appartment.dto';
import { UpdateAppartmentDto } from './dto/update-appartment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';

/* @ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard) */
@ApiTags('Appartments')
@Controller({
  path: 'appartment',
  version: '1',
})
export class AppartmentController {
  constructor(private readonly appartmentService: AppartmentService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateAppartmentDto) {
    return this.appartmentService.create(createProfileDto);
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
      await this.appartmentService.findManyWithPagination({
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
    return this.appartmentService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateAppartmentDto) {
    return this.appartmentService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appartmentService.softDelete(id);
  }
}
