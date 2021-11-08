import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDirectionDto {
  @IsNotEmpty({ message: 'Lastname is required' })
  @MaxLength(250, { message: 'Maximum characters is 100' })
  direction: string;
}
