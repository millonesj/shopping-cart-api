import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { DirectionsModule } from './directions/directions.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { PaymethodsModule } from './paymethods/paymethods.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ProductsModule,
    CartsModule,
    UsersModule,
    CartDetailModule,
    OrdersModule,
    DirectionsModule,
    OrderStatusModule,
    PaymethodsModule,
    OrderDetailModule,
  ],
})
export class ShopModule {}
