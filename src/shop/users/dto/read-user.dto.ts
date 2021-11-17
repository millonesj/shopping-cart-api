import { Exclude, Expose } from 'class-transformer';
import { BasicEntity } from 'src/share/entities/basic.entity';

@Exclude()
export class ReadUserDto extends BasicEntity {
  @Expose()
  name: string;

  @Expose()
  lastname: string;
}
