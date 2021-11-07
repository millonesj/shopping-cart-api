import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/share/dto/page-options.dto';
export class QueryProductDto extends PageOptionsDto {
  @Type(() => String, {})
  @IsOptional()
  name?: string;

  @Type(() => String)
  @IsOptional()
  sku?: string;

  @Type(() => Number)
  @IsOptional()
  fromPrice?: number;

  @Type(() => Number)
  @IsOptional()
  toPrice?: number;
}
