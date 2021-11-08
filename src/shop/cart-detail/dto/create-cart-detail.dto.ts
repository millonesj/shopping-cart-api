import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartDetailDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'cartId is required' })
  readonly cartId: number;

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
