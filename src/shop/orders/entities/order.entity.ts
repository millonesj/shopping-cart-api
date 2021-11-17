import { BasicEntity } from 'src/share/entities/basic.entity';
import { Direction } from 'src/shop/directions/entities/direction.entity';
import { OrderDetail } from 'src/shop/order-detail/entities/order-detail.entity';
import { OrderStatus } from 'src/shop/order-status/entities/order-status.entity';
import { User } from 'src/shop/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Order extends BasicEntity {
  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  directionId: number;

  @Column({ type: 'int' })
  paymethodId: number;

  @Column({ type: 'int' })
  orderStatusId: number;

  @ManyToOne(
    () => User,
    user => user.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Direction,
    direction => direction.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'direction_id' })
  direction: Direction;

  @ManyToOne(
    () => OrderStatus,
    orderStatus => orderStatus.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @OneToMany(
    () => OrderDetail,
    orderDetail => orderDetail.order,
  )
  @JoinColumn({ name: 'id' })
  orderDetail: OrderDetail[];
}
