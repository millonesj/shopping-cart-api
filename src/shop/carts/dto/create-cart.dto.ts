import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateCartDetailDto } from './create-cart-detail.dto';

export class CreateCartDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'detail is required' })
  detail: CreateCartDetailDto[];
}
