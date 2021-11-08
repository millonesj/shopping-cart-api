import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CreateCartDetailDto } from './create-cart-detail.dto';

export class UpdateCartDetailDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'productId is required' })
  readonly productId: number;

  @Type(() => Number)
  @Min(1)
  @IsInt()
  @IsNotEmpty({ message: 'quantity is required' })
  readonly quantity: number;
}
