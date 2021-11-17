import { Column, Entity } from 'typeorm';
import { BasicEntity } from '../../../share/entities/basic.entity';

@Entity()
export class Product extends BasicEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  sku: string;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  price: number;

  @Column({ type: 'int' })
  stock: number;
}
