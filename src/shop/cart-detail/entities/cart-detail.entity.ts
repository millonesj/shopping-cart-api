import { Cart } from 'src/shop/carts/entities/cart.entity';
import { Product } from 'src/shop/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'int' })
  cartId: number;

  @ManyToOne(
    () => Product,
    product => product.id,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(
    () => Cart,
    cart => cart.id,
  )
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
