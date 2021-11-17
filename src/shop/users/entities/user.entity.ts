import { BasicEntity } from 'src/share/entities/basic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BasicEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;
}
