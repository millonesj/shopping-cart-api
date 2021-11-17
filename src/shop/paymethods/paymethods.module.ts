import { Module } from '@nestjs/common';
import { PaymethodsService } from './paymethods.service';
import { PaymethodsController } from './paymethods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paymethod } from './entities/paymethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paymethod])],
  controllers: [PaymethodsController],
  providers: [PaymethodsService],
})
export class PaymethodsModule {}
