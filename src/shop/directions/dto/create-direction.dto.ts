import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDirectionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Lastname is required' })
  @MaxLength(250, { message: 'Maximum characters is 100' })
  direction: string;
}
