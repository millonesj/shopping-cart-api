import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'directionId is required' })
  directionId: number;

  // @Type(() => Number)
  // @IsInt()
  // @IsNotEmpty({ message: 'paymethodId is required' })
  // paymethodId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'orderStatusId is required' })
  orderStatusId: number;
}
