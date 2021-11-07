import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Field is required' })
  private name: string;

  @IsNotEmpty({ message: 'Field is required' })
  @MaxLength(100, { message: 'Maximum characters is 100' })
  private sku: string;

  @IsNotEmpty({ message: 'Field is required' })
  private price: number;

  @IsNotEmpty({ message: 'Field is required' })
  private stock: number;
}
