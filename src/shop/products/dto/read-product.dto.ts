import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BasicEntity } from 'src/share/entities/basic.entity';

@Exclude()
export class ReadProductDto extends BasicEntity {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  sku: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  stock: number;
}
