import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Maximum characters is 100' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Lastname is required' })
  @MaxLength(100, { message: 'Maximum characters is 100' })
  lastname: string;
}
