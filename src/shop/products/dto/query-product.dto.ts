import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/share/dto/page-options.dto';
export class QueryProductDto extends PageOptionsDto {
  @ApiProperty()
  @Type(() => String, {})
  @IsOptional()
  name?: string;

  @ApiProperty()
  @Type(() => String)
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  fromPrice?: number;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  toPrice?: number;
}
