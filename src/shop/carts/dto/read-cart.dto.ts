import { CreateCartDetailDto } from 'src/shop/cart-detail/dto/create-cart-detail.dto';

export class ReadCartDto {
  private id: number;
  private userId: number;
  private detail: CreateCartDetailDto[];
}
