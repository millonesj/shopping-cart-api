import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartDetailDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'cartId is required' })
  readonly cartId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'productId is required' })
  readonly productId: number;

  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  @IsNotEmpty({ message: 'quantity is required' })
  readonly quantity: number;
}
