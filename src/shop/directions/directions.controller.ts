import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { QueryDirectionDto } from './dto/query-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Post()
  create(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionsService.create(createDirectionDto);
  }

  @Get()
  findAll(
    @Query()
    queryDirection: QueryDirectionDto,
  ) {
    return this.directionsService.findAllByUser(queryDirection);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectionDto: UpdateDirectionDto,
  ) {
    return this.directionsService.update(+id, updateDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionsService.remove(+id);
  }
}
