import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { DirectionsModule } from './directions/directions.module';

@Module({
  imports: [
    ProductsModule,
    CartsModule,
    UsersModule,
    CartDetailModule,

    DirectionsModule,
  ],
})
export class ShopModule {}
