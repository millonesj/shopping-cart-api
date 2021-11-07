import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Exclude()
export class BasicEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false, select: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: string;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedDate: string;
}
