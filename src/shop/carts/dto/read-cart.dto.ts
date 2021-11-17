import { ApiProperty } from '@nestjs/swagger';
import { CreateCartDetailDto } from 'src/shop/cart-detail/dto/create-cart-detail.dto';

export class ReadCartDto {
  @ApiProperty()
  private id: number;
  @ApiProperty()
  private userId: number;
  @ApiProperty()
  private detail: CreateCartDetailDto[];
}
