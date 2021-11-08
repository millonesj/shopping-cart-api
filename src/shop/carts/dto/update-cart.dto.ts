import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateCartDetailDto } from 'src/shop/cart-detail/dto';

export class UpdateCartDto {
  @IsNotEmpty({ message: 'detail is required' })
  detail: CreateCartDetailDto[];
}
