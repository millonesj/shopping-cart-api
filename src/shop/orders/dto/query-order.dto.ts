import { Type } from 'class-transformer';

export class QueryOrderDto {
  @Type(() => Number)
  userId: number;
}
