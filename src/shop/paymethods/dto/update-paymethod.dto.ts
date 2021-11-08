import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymethodDto } from './create-paymethod.dto';

export class UpdatePaymethodDto extends PartialType(CreatePaymethodDto) {}
