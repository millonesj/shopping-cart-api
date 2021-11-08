import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDetailDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  cartId: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quality: number;
}
