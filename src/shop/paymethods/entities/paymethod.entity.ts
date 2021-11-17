import { BasicEntity } from 'src/share/entities/basic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Paymethod extends BasicEntity {
  @Column({ length: 20 })
  name: string;
}
