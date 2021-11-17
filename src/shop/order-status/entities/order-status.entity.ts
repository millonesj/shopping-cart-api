import { BasicEntity } from 'src/share/entities/basic.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class OrderStatus extends BasicEntity {
  @Column({ length: 20 })
  name: string;
}
