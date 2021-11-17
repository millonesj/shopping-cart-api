import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateCartDetailDto } from 'src/shop/cart-detail/dto';

export class UpdateCartDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'detail is required' })
  detail: CreateCartDetailDto[];
}
