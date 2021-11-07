import { Exclude, Expose } from 'class-transformer';
import { BasicEntity } from 'src/share/entities/basic.entity';

@Exclude()
export class ReadProductDto extends BasicEntity {
  @Expose()
  name: string;

  @Expose()
  sku: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;
}
