import { Type } from 'class-transformer';

export class QueryDirectionDto {
  @Type(() => Number)
  userId: number;
}
