import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryDirectionDto {
  @ApiProperty()
  @Type(() => Number)
  userId: number;
}
