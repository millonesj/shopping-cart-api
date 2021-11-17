import { BasicEntity } from 'src/share/entities/basic.entity';
import { CartDetail } from 'src/shop/cart-detail/entities/cart-detail.entity';
import { User } from 'src/shop/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Cart extends BasicEntity {
  @Column({ type: 'int' })
  userId: number;

  @OneToOne(
    () => User,
    user => user.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => CartDetail,
    cartDetail => cartDetail.cart,
  )
  @JoinColumn({ name: 'id' })
  cartDetail: CartDetail[];
}
