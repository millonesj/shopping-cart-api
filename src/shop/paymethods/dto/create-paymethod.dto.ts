import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePaymethodDto {
  @IsNotEmpty({ message: 'Lastname is required' })
  @MaxLength(250, { message: 'Maximum characters is 20' })
  name: string;
}
