import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Field is required' })
  private name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Field is required' })
  @MaxLength(100, { message: 'Maximum characters is 100' })
  private sku: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Field is required' })
  private price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Field is required' })
  private stock: number;
}
