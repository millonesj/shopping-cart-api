import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryOrderDto {
  @ApiProperty()
  @Type(() => Number)
  userId: number;
}
