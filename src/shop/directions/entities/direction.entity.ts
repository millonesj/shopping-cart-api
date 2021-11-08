import { BasicEntity } from 'src/share/entities/basic.entity';
import { User } from 'src/shop/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Direction extends BasicEntity {
  @Column({ length: 250 })
  direction: string;

  @Column({ type: 'int' })
  userId: number;

  @OneToOne(
    () => User,
    user => user.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
