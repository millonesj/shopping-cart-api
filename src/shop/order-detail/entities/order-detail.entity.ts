import { Order } from 'src/shop/orders/entities/order.entity';
import { Product } from 'src/shop/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from '../../../share/entities/basic.entity';

@Entity()
export class OrderDetail extends BasicEntity {
  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int' })
  orderId: number;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  price: number;

  @Column({ type: 'int' })
  quality: number;

  @ManyToOne(
    () => Product,
    product => product.id,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(
    () => Order,
    order => order.id,
  )
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
